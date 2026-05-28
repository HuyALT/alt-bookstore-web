type AddToCartModalProps = {
  open: boolean;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function AddToCartModal({
  open,
  quantity,
  onQuantityChange,
  onClose,
  onConfirm,
}: AddToCartModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm bg-surface border border-outline-variant/30 shadow-xl p-8">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-3">
          Add to Cart
        </h2>

        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          Nhập số lượng bạn muốn thêm vào giỏ hàng.
        </p>

        <div className="mb-8">
          <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2 uppercase">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              onQuantityChange(value < 1 ? 1 : value);
            }}
            className="
              w-full
              bg-surface-container-low
              border border-outline-variant/40
              px-4 py-3
              font-body-md text-body-md text-on-surface
              focus:outline-none
              focus:border-primary
              transition-colors
            "
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1
              border border-outline-variant
              text-on-surface-variant
              py-3
              font-label-sm text-label-sm
              uppercase
              hover:text-primary
              hover:border-primary
              transition-colors
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1
              bg-primary-container
              text-on-primary-container
              py-3
              font-label-sm text-label-sm
              uppercase
              hover:bg-primary
              hover:text-on-primary
              transition-colors
            "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
