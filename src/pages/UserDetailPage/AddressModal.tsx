import { useEffect, useState } from "react";
import type { AddressRequest } from "../../types/request/AddressResquest";

interface AddressModalProps {
  open: boolean;
  mode: "add" | "edit";
  initialData?: AddressRequest | null;
  onClose: () => void;
  onSubmit: (data: AddressRequest) => void;
  isFirstAddress: boolean;
}

const emptyForm: AddressRequest = {
  fullName: "",
  phoneNumber: "",
  line1: "",
  line2: "",
  city: "",
  postcode: "",
  country: "",
  isDefault: false,
};

export default function AddressModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
  isFirstAddress,
}: AddressModalProps) {
  const [form, setForm] = useState<AddressRequest>(emptyForm);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setForm({
        fullName: initialData.fullName,
        phoneNumber: initialData.phoneNumber,
        line1: initialData.line1,
        line2: initialData.line2,
        city: initialData.city,
        postcode: initialData.postcode,
        country: initialData.country,
        isDefault: initialData.isDefault,
      });
    } else {
      setForm({
        ...emptyForm,
        isDefault: isFirstAddress,
      });
    }
  }, [open, mode, initialData]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "phoneNumber" || name === "postcode"
            ? value.replace(/\D/g, "")
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-DEFAULT shadow-xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition"
        >
          ✕
        </button>

        <h2 className="font-headline-md text-[22px] text-on-surface mb-6">
          {mode === "add" ? "Add new address" : "Edit address"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="w-full px-4 py-2 rounded-DEFAULT border border-outline-variant bg-surface-container text-on-surface focus:outline-none focus:border-primary"
          />

          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
            required
            className="w-full px-4 py-2 rounded-DEFAULT border border-outline-variant bg-surface-container text-on-surface focus:outline-none focus:border-primary"
          />

          <input
            name="line1"
            value={form.line1}
            onChange={handleChange}
            placeholder="Address line 1"
            required
            className="w-full px-4 py-2 rounded-DEFAULT border border-outline-variant bg-surface-container text-on-surface focus:outline-none focus:border-primary"
          />

          <input
            name="line2"
            value={form.line2}
            onChange={handleChange}
            placeholder="Address line 2"
            className="w-full px-4 py-2 rounded-DEFAULT border border-outline-variant bg-surface-container text-on-surface focus:outline-none focus:border-primary"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-full px-4 py-2 rounded-DEFAULT border border-outline-variant bg-surface-container text-on-surface focus:outline-none focus:border-primary"
            />

            <input
              name="postcode"
              value={form.postcode}
              onChange={handleChange}
              placeholder="Post code"
              required
              className="w-full px-4 py-2 rounded-DEFAULT border border-outline-variant bg-surface-container text-on-surface focus:outline-none focus:border-primary"
            />

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="w-full px-4 py-2 rounded-DEFAULT border border-outline-variant bg-surface-container text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <label className="flex items-center gap-2 text-on-surface-variant font-body-md text-[14px]">
            <input
              type="checkbox"
              name="isDefault"
              checked={isFirstAddress ? true : form.isDefault}
              onChange={handleChange}
              className="accent-primary"
              disabled={isFirstAddress}
            />
            Set as default address
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-outline-variant text-on-surface-variant font-label-sm hover:bg-surface-container transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-sm hover:opacity-90 transition"
            >
              {mode === "add" ? "Save address" : "Update address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
