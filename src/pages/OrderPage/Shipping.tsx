import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { type ShippingCostReposne } from "../../types/response/ShippingCostResponse";
import { getAllShippingCosts } from "../../services/ShippingCostApi";
import { useToast } from "../../components/ToastContext";
import { type AddressResponse } from "../../types/response/AddressResponse";
import { addAddress, getAddresses } from "../../services/AddressApi";
import type { CartResponse } from "../../types/response/CartResponse";
import { getCart } from "../../services/CartApi";
import { formatMoney } from "../../util/formatMoney";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../services/OrderApi";

export default function Shipping() {
  const NEW_ADDRESS_ID = "new";
  const navigate = useNavigate();

  const createEmptyShippingAddress = (isDefault: boolean) => ({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    phoneNumber: "",
    isDefault: isDefault,
  });
  const [shippingAddress, setShippingAddress] = useState(
    createEmptyShippingAddress(true),
  );

  const [shippingCosts, setShippingCosts] = useState<ShippingCostReposne[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<number>(1);
  const [cartResponse, setCartResponse] = useState<CartResponse>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const { showToast } = useToast();

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    const fetchShippingMethod = async () => {
      const res = await getAllShippingCosts();
      if (res.success) {
        setShippingCosts(res.data);
        return;
      }
      showToast("error", "Can not fetch shipping method");
    };
    const fetchAddresses = async () => {
      const response = await getAddresses();
      if (response.success) {
        const sortedAddresses = sortDefaultFirst(response.data);
        setAddresses(sortedAddresses);
        const defaultAddress = response.data.find(
          (address) => address.isDefault,
        );
        if (defaultAddress) {
          handleSelectAddress(defaultAddress);
        } else {
          handleSelectNewAddress();
        }
      } else {
        showToast("error", "Failed to fetch addresses");
      }
    };
    const fetchCarts = async () => {
      const res = await getCart();
      if (res.success) {
        setCartResponse(res.data);
        return;
      }
      showToast("error", "Error fetch cart");
    };
    fetchShippingMethod();
    fetchAddresses();
    fetchCarts();
  }, []);
  const sortDefaultFirst = (addresses: AddressResponse[]) => {
    return [...addresses].sort((a, b) => {
      if (a.isDefault === b.isDefault) return 0;
      return a.isDefault ? -1 : 1;
    });
  };
  const selectedShipping = shippingCosts.find(
    (shipping) => shipping.id === selectedShippingId,
  );
  const shippingFee = selectedShipping?.cost ?? 0;
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | number | null
  >(
    addresses.find((address) => address.isDefault)?.id ??
      addresses[0]?.id ??
      null,
  );
  const isNewAddress = selectedAddressId === NEW_ADDRESS_ID;

  const handleSelectAddress = (address: AddressResponse) => {
    setSelectedAddressId(address.id);

    setShippingAddress({
      fullName: address.fullName,
      line1: address.line1,
      line2: address.line2 || "",
      city: address.city,
      postcode: address.postcode,
      phoneNumber: address.phoneNumber,
      isDefault: address.isDefault,
    });
    setShowNewAddressForm(false);
  };

  const handleSelectNewAddress = () => {
    setSelectedAddressId(NEW_ADDRESS_ID);
    setShippingAddress(createEmptyShippingAddress(addresses.length === 0));
    setShowNewAddressForm(true);
  };

  const handleCheckout = async () => {
    if (
      shippingAddress.fullName.trim() === "" ||
      shippingAddress.line1.trim() === "" ||
      shippingAddress.city.trim() === "" ||
      shippingAddress.postcode.trim() === "" ||
      shippingAddress.phoneNumber.trim() === ""
    ) {
      showToast("error", "Please fill in all required fields");
      return;
    }
    if (isNewAddress) {
      const res = await addAddress({
        fullName: shippingAddress.fullName,
        line1: shippingAddress.line1,
        line2: shippingAddress.line2,
        city: shippingAddress.city,
        postcode: shippingAddress.postcode,
        phoneNumber: shippingAddress.phoneNumber,
        isDefault: shippingAddress.isDefault,
        country: "VN",
      });
      if (res.success) {
        const orderResponse = await checkout({
          addressId: res.data.id,
          shipingCost: shippingFee,
        });
        if (orderResponse.success) {
          showToast("success", "Checkout successfully");
          navigate(`/order-success/${orderResponse.data.orderNumber}`);
        } else {
          showToast("error", "Checkout failed");
        }
      } else {
        showToast("error", "Failed to add new address");
      }
      return;
    }
    const orderResponse = await checkout({
      addressId: selectedAddressId as string,
      shipingCost: shippingFee,
    });
    if (orderResponse.success) {
      showToast("success", "Checkout successfully");
      navigate(`/order-success/${orderResponse.data.orderNumber}`);
    } else {
      showToast("error", "Checkout failed");
    }
  };

  return (
    <main className="pt-32 flex-grow max-w-container mx-auto w-full px-margin-page py-16 ">
      <div className="flex items-center justify-center mb-16 space-x-4 w-full max-w-2xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center gap-3 opacity-40">
            <span className="w-8 h-8 rounded-full border bg-primary text-on-primary flex items-center justify-center text-label-sm">
              <CircleCheck />
            </span>
            <span className="font-label-sm text-label-sm  text-on-surface-variant uppercase">
              Cart
            </span>
          </div>
          <div className="w-16 h-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-3 ">
            <span className="w-8 h-8 rounded-full border bg-primary text-on-primary flex items-center justify-center text-label-sm">
              2
            </span>
            <span className="font-label-sm text-label-sm text-primary uppercase">
              Shipping
            </span>
          </div>
          <div className="w-16 h-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-3 opacity-40">
            <span className="w-8 h-8 rounded-full border border-outline text-on-surface flex items-center justify-center text-label-sm">
              3
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Complete
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-gutter items-start">
        <div className="w-full lg:w-2/3 space-y-12">
          <section className="mb-12">
            <h2 className="font-headline-md text-headline-md mb-8">
              Saved Addresses
            </h2>

            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
              {addresses.map((address) => {
                const isSelected =
                  selectedAddressId === address.id && !showNewAddressForm;

                return (
                  <label
                    key={address.id}
                    className={`flex-shrink-0 w-[280px] p-4 rounded-DEFAULT cursor-pointer transition-colors group relative ${
                      isSelected
                        ? "border border-primary bg-surface-container-low"
                        : "border border-outline-variant hover:border-primary bg-transparent"
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`font-label-sm text-label-sm uppercase tracking-widest ${
                            isSelected
                              ? "text-primary"
                              : "text-on-surface-variant"
                          }`}
                        >
                          {address.isDefault ? "Default" : "Secondary"}
                        </span>

                        <input
                          className="w-5 h-5 accent-[#765a14] cursor-pointer focus:ring-0 focus:outline-none"
                          name="saved_address"
                          type="radio"
                          value={address.id}
                          checked={isSelected}
                          onChange={() => handleSelectAddress(address)}
                        />
                      </div>

                      <p className="font-body-md text-body-md font-medium">
                        {address.fullName}
                      </p>
                      <p className="font-body-md text-body-md font-medium">
                        {address.phoneNumber}
                      </p>

                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {address.line1}
                        {address.line2 && (
                          <>
                            <br />
                            {address.line2}
                          </>
                        )}
                        <br />
                        {address.city}, {address.postcode}
                      </p>
                    </div>
                  </label>
                );
              })}

              <label
                className={`flex-shrink-0 w-[280px] p-4 rounded-DEFAULT cursor-pointer transition-colors group relative ${
                  showNewAddressForm
                    ? "border border-primary bg-surface-container-low"
                    : "border border-dashed border-outline-variant hover:border-primary bg-transparent"
                }`}
              >
                <div className="flex flex-col h-full items-center justify-center gap-2 text-on-surface-variant group-hover:text-primary">
                  <input
                    className="w-5 h-5 accent-[#765a14] cursor-pointer focus:ring-0 focus:outline-none hidden"
                    name="saved_address"
                    type="radio"
                    value={NEW_ADDRESS_ID}
                    checked={showNewAddressForm}
                    onChange={handleSelectNewAddress}
                  />

                  <span className="material-symbols-outlined text-2xl">
                    add_circle
                  </span>

                  <span className="font-label-sm text-label-sm uppercase tracking-widest">
                    New Address
                  </span>
                </div>
              </label>
            </div>
          </section>
          {showNewAddressForm && (
            <section>
              <h1 className="font-headline-md text-headline-md mb-8">
                Shipping Address
              </h1>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                      id="fullName"
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                      Address line 1
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                      id="addressLine1"
                      type="text"
                      value={shippingAddress.line1}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          addressLine1: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                      Address line 2 (Optional)
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                      id="addressLine2"
                      type="text"
                      value={shippingAddress.line2}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          addressLine2: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                      City
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                      id="city"
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                      Postal Code
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                      id="postalCode"
                      type="text"
                      value={shippingAddress.postcode}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          postalCode: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                      Phone Number
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                      id="phoneNumber"
                      type="tel"
                      value={shippingAddress.phoneNumber}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </form>
            </section>
          )}

          <section className="pt-8 border-t border-outline-variant/30">
            <h2 className="font-headline-md text-headline-md mb-8">
              Shipping Method
            </h2>

            <div className="space-y-4">
              {shippingCosts.map((shipping) => (
                <label
                  key={shipping.id}
                  className="flex items-center justify-between p-4 border border-outline-variant rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors group has-[:checked]:border-primary has-[:checked]:bg-surface-container-low"
                >
                  <div className="flex items-center gap-4">
                    <input
                      className="text-primary focus:ring-primary border-outline-variant"
                      name="shipping_method"
                      type="radio"
                      value={shipping.id}
                      checked={selectedShippingId === shipping.id}
                      onChange={() => setSelectedShippingId(shipping.id)}
                    />

                    <div>
                      <div className="font-body-md text-body-md font-medium group-has-[:checked]:text-primary">
                        {shipping.name}
                      </div>
                    </div>
                  </div>

                  <div className="font-body-md text-body-md">
                    ${shipping.cost}
                  </div>
                </label>
              ))}
            </div>
          </section>
          <div className="pt-8">
            <button
              className="w-full md:w-auto bg-primary-container text-on-primary-container px-8 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-inverse-primary transition-colors duration-300 rounded-DEFAULT"
              onClick={handleCheckout}
            >
              Complete Checkout
            </button>
          </div>
        </div>

        <aside className="w-full lg:w-1/3 bg-surface-container-low p-8 rounded-DEFAULT sticky top-8">
          <h3 className="font-headline-md text-headline-md mb-6 border-b border-outline-variant/30 pb-4">
            Order Summary
          </h3>

          <div className="space-y-6 mb-8">
            {cartResponse.items.map((item) => (
              <div className="flex gap-4">
                <div className="w-20 h-28 bg-surface-variant flex-shrink-0 relative overflow-hidden rounded-sm">
                  <img
                    alt="Book cover"
                    className="w-full h-full object-cover"
                    data-alt="A close-up of a sophisticated, minimalist hardcover book lying on a clean surface. The lighting is soft and natural, emphasizing the texture of the paper and the elegant serif typography on the cover. The color palette is composed of muted taupes, creams, and subtle gold accents, reflecting a high-end, intellectual aesthetic."
                    src={item.coverImageUrl}
                  />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-headline-md text-body-lg leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {item.author}
                    </p>
                  </div>
                  <p className="font-body-md text-body-md">
                    {formatMoney(item.lineTotal)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-outline-variant/30 pt-6 space-y-4">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md text-body-md">Subtotal</span>
              <span className="font-body-md text-body-md">
                {formatMoney(cartResponse.totalPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md text-body-md">Shipping</span>
              <span className="font-body-md text-body-md"></span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md text-body-md">Shipping Fee</span>
              <span className="font-body-md text-body-md">
                {shippingFee > 0 ? formatMoney(shippingFee) : "Free"}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30 mt-4">
              <span className="font-headline-md text-headline-md">Total</span>
              <span className="font-headline-md text-headline-md">
                {formatMoney(cartResponse.totalPrice + shippingFee)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
