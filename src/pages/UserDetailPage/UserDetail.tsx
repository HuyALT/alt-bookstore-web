import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../../services/AuthApi";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../../types/response/UserProfile";
import type { AddressResponse } from "../../types/response/AddressResponse";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../../services/AddressApi";
import { useToast } from "../../components/ToastContext";
import type { AddressRequest } from "../../types/request/AddressResquest";
import AddressModal from "./AddressModal";
import type { OrderResponse } from "../../types/response/OrderResponse";
import { myOrders } from "../../services/OrderApi";

export default function UserDetail() {
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const isFirstAddress = addresses.length === 0;
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedAddress, setSelectedAddress] =
    useState<AddressResponse | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getCurrentUser();

        if (userResponse.success) {
          setUser(userResponse.data);
        }
      } catch (error) {
        navigate("/login");
      }
    };
    const fetchAddresses = async () => {
      const response = await getAddresses();
      if (response.success) {
        const sortedAddresses = sortDefaultFirst(response.data);
        setAddresses(sortedAddresses);
      } else {
        showToast("error", "Failed to fetch addresses");
      }
    };
    const fetchOrders = async () => {
      try {
        const response = await myOrders(0, 3);
        setOrders(response.data);
      } catch (error) {
        showToast("error", "Failed to fetch orders");
      }
    };
    fetchUser();
    fetchAddresses();
    fetchOrders();
  }, []);
  const sortDefaultFirst = (addresses: AddressResponse[]) => {
    return [...addresses].sort((a, b) => {
      if (a.isDefault === b.isDefault) return 0;
      return a.isDefault ? -1 : 1;
    });
  };
  const handleSubmitAddress = async (data: AddressRequest) => {
    if (modalMode === "add") {
      const response = await addAddress(data);
      if (response.success) {
        setAddresses((prev) => {
          const newAddress = response.data;

          const updatedAddresses = newAddress.isDefault
            ? prev.map((address) => ({
                ...address,
                isDefault: false,
              }))
            : prev;

          return sortDefaultFirst([...updatedAddresses, newAddress]);
        });
        setOpenAddressModal(false);
        showToast("success", "Address added successfully");
      }
    }
    if (modalMode === "edit" && selectedAddress) {
      const response = await updateAddress(selectedAddress.id, data);

      if (response.success) {
        const updatedAddress = response.data;

        setAddresses((prev) => {
          const updatedAddresses = prev.map((address) => {
            if (address.id === updatedAddress.id) {
              return updatedAddress;
            }
            if (updatedAddress.isDefault) {
              return {
                ...address,
                isDefault: false,
              };
            }
            return address;
          });

          return sortDefaultFirst(updatedAddresses);
        });
        setOpenAddressModal(false);
        setSelectedAddress(null);
      }
    }
  };
  const openAddModal = () => {
    setModalMode("add");
    setSelectedAddress(null);
    setOpenAddressModal(true);
  };
  const openEditModal = (address: AddressResponse) => {
    setModalMode("edit");
    setSelectedAddress({
      id: address.id,
      fullName: address.fullName,
      line1: address.line1,
      line2: address.line2 || "",
      city: address.city,
      postcode: address.postcode,
      country: address.country,
      phoneNumber: address.phoneNumber,
      isDefault: address.isDefault,
      createdAt: address.createdAt,
    });
    setOpenAddressModal(true);
  };
  const setDefaultAddress = async (address: AddressResponse) => {
    address.isDefault = true;
    const response = await updateAddress(address.id, address);

    if (response.success) {
      const updatedAddress = response.data;

      setAddresses((prev) => {
        const updatedAddresses = prev.map((address) => {
          if (address.id === updatedAddress.id) {
            return updatedAddress;
          }
          if (updatedAddress.isDefault) {
            return {
              ...address,
              isDefault: false,
            };
          }
          return address;
        });

        return sortDefaultFirst(updatedAddresses);
      });
    }
  };
  const removeAddress = async (id: string) => {
    const response = await deleteAddress(id);
    if (response.success) {
      setAddresses((prev) => prev.filter((address) => address.id !== id));
      showToast("success", "Address removed successfully");
    }
  };
  const handlelogOut = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <main className="pt-32 pb-section-gap max-w-container mx-auto px-margin-page">
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">
              Personal Library
            </span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">
              Welcome back, {user?.name || "User"}.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-xl">
              “A room without books is like a body without a soul.” Continue
              your curation of the intellectual and the rare.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-primary-container text-on-primary-container px-8 py-3 rounded-DEFAULT font-label-sm text-label-sm hover:brightness-95 transition-all duration-300 scale-95 active:scale-90">
              EDIT USERNAME
            </button>
            <button
              className="border border-outline text-on-surface px-8 py-3 rounded-DEFAULT font-label-sm text-label-sm hover:bg-surface-container transition-all duration-300 scale-95 active:scale-90"
              onClick={handlelogOut}
            >
              LOG OUT
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <section className="md:col-span-8 space-y-8">
          <div className="mt-12 p-8 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <h3 className="font-label-sm text-label-sm text-primary mb-4 tracking-widest uppercase">
              SECURITY
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary p-3 bg-surface-container rounded-full">
                  lock
                </span>
                <div>
                  <h4 className="font-headline-md text-[18px] text-on-surface">
                    Account Password
                  </h4>
                  <p className="font-body-md text-on-surface-variant text-[14px]">
                    Ensure your account is protected with a secure password.
                  </p>
                </div>
              </div>
              <button className="border border-outline text-on-surface px-6 py-2 rounded-full font-label-sm text-label-sm hover:bg-surface-container transition-all duration-300">
                CHANGE PASSWORD
              </button>
            </div>
          </div>
          <div className="mt-12 p-8 bg-surface-container-low rounded-lg border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
                ADDRESS BOOK
              </h3>
              <button
                className="flex items-center gap-2 text-primary font-label-sm text-label-sm hover:underline"
                onClick={openAddModal}
              >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                ADD NEW ADDRESS
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.length === 0 ? (
                <div className="md:col-span-2 p-8 bg-surface-container/50 border border-outline-variant rounded-DEFAULT text-center">
                  <p className="font-headline-md text-on-surface mb-2">
                    No address
                  </p>

                  <p className="font-body-md text-on-surface-variant text-[14px] mb-6">
                    You don't have any saved address yet.
                  </p>

                  <button
                    className="px-5 py-2 bg-primary text-on-primary rounded-full font-label-sm hover:opacity-90 transition"
                    onClick={openAddModal}
                  >
                    Add now
                  </button>
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="p-6 bg-surface-container/50 border border-primary/20 rounded-DEFAULT relative"
                  >
                    <span className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-label-sm px-2 py-0.5 rounded-full">
                      {address.isDefault ? "DEFAULT" : "SECONDARY"}
                    </span>

                    <p className="font-label-sm text-primary mb-2">
                      {address.fullName}
                    </p>

                    <p className="font-headline-md text-[16px] text-on-surface mb-1">
                      {address.phoneNumber}
                    </p>

                    <p className="font-body-md text-on-surface-variant text-[14px]">
                      {address.line1}, {address.line2}
                      <br />
                      {address.city}, {address.postcode}
                      <br />
                      {address.country}
                    </p>

                    <div className="mt-6 flex gap-4">
                      {!address.isDefault && (
                        <button
                          className="text-primary font-label-sm text-[11px] hover:underline uppercase"
                          onClick={() => setDefaultAddress(address)}
                        >
                          Set as Default
                        </button>
                      )}

                      <button
                        className="text-on-surface-variant font-label-sm text-[11px] hover:text-primary transition-colors uppercase"
                        onClick={() => openEditModal(address)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-on-surface-variant font-label-sm text-[11px] hover:text-error transition-colors uppercase"
                        onClick={() => removeAddress(address.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <aside className="md:col-span-4 space-y-12">
          <section>
            <div className="border-b border-outline-variant/30 pb-4 mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Recent Orders
              </h2>
            </div>
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="p-8 bg-surface-container/50 border border-outline-variant rounded-DEFAULT text-center">
                  <p className="font-headline-md text-on-surface mb-2">
                    No orders yet
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div className="group flex gap-4 items-start pb-6 border-b border-outline-variant/10">
                    <div className="w-16 h-20 bg-surface-container-highest shrink-0 overflow-hidden"></div>
                    <div className="flex-1">
                      <p className="font-label-sm text-label-sm text-primary">
                        #{order.orderNumber}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                        {order.placeAt}
                      </p>
                    </div>
                    <span
                      className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors cursor-pointer"
                      data-icon="arrow_forward"
                    >
                      arrow_forward
                    </span>
                  </div>
                ))
              )}
            </div>
            <button className="w-full mt-6 text-center font-label-sm text-label-sm text-on-surface-variant hover:text-primary border border-outline/30 py-3 transition-colors">
              VIEW ALL HISTORY
            </button>
          </section>
          <section className="bg-surface-container p-8 rounded-lg">
            <h3 className="font-label-sm text-label-sm text-primary mb-6 tracking-widest uppercase">
              YOUR CURATIONS
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded-full">
                Art Theory
              </span>
              <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded-full">
                classNameic Fiction
              </span>
              <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded-full">
                Philosophy
              </span>
              <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded-full">
                Photography
              </span>
              <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded-full">
                Architecture
              </span>
            </div>
            <p className="font-body-md text-on-surface-variant mt-6 text-[14px]">
              We tailor our staff picks based on your interest in rare
              architectural journals and existentialist texts.
            </p>
          </section>
        </aside>
      </div>

      <AddressModal
        open={openAddressModal}
        mode={modalMode}
        initialData={selectedAddress}
        onClose={() => {
          setOpenAddressModal(false);
          setSelectedAddress(null);
        }}
        onSubmit={handleSubmitAddress}
        isFirstAddress={isFirstAddress}
      />
    </main>
  );
}
