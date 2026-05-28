import { useState } from "react";
import { addOrUpdateCart } from "../../services/CartApi";
import { useToast } from "../../components/ToastContext";
import AddToCartModal from "./AddToCartModal";
import { addToWishlist, removeFromWishlist } from "../../services/WishListApi";

type BookDetailProps = {
  id: string;
  genre: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  stockQty: number;
  description: string;
  yearPublished: number;
  soldCount: number;
  isInWishlist?: boolean;
  onWishlistChange?: (bookId: string, isAdded: boolean) => void;
};
export default function Hero({
  id,
  genre,
  title,
  author,
  price,
  imageUrl,
  stockQty,
  description,
  yearPublished,
  soldCount,
  isInWishlist = false,
  onWishlistChange,
}: BookDetailProps) {
  const [openAddCartModal, setOpenAddCartModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { showToast } = useToast();
  const handleOpenModal = () => {
    setQuantity(1);
    setOpenAddCartModal(true);
  };
  const hadleConfirmAddToCart = async () => {
    const response = await addOrUpdateCart({
      bookId: id,
      quantity,
    });
    if (response.success) {
      showToast("success", "Item added to cart successfully!");
      console.log(showToast);
    } else {
      showToast("error", response.message || "Failed to add item to cart.");
    }
    setOpenAddCartModal(false);
  };
  const handleWishlistClick = async () => {
    const nextValue = !isInWishlist;

    onWishlistChange?.(id, nextValue);

    const response = isInWishlist
      ? await removeFromWishlist(id)
      : await addToWishlist(id);

    if (!response.success) {
      onWishlistChange?.(id, isInWishlist);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
      <div className="lg:col-span-5">
        <div className="relative bg-surface-container p-12 flex justify-center items-center overflow-hidden">
          <img
            className="w-full max-w-[400px] shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            data-alt="A high-end book cover leaning against a textured plaster wall in a sun-drenched library. The cover is a deep charcoal grey with elegant, minimalist gold serif typography and a subtle debossed geometric pattern. Soft afternoon light creates gentle shadows and highlights the premium tactile paper texture of the book. The overall mood is quiet, sophisticated, and intellectual, following a high-end archival aesthetic."
            src={imageUrl}
          />
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-8">
        <header className="border-b border-outline-variant/30 pb-8">
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
            {title}
          </h1>
          <p className="font-headline-md text-headline-md italic text-on-surface-variant">
            By {author}
          </p>
        </header>
        <div className="flex items-center gap-6">
          <span className="font-headline-lg text-headline-lg text-primary">
            ${price.toFixed(2)}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant px-3 py-1 bg-surface-container border border-outline-variant/30">
            ONLY {stockQty} COPIES LEFT
          </span>
        </div>
        <div className="prose prose-stone max-w-none">
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            className="flex-1 bg-primary-container text-on-primary-container font-label-sm text-label-sm py-5 uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 active:scale-95"
            onClick={handleOpenModal}
          >
            Add to Cart
          </button>
          <button
            className={`px-8 border border-primary font-label-sm text-label-sm py-5 uppercase tracking-[0.2em]  transition-all duration-300 active:scale-95 ${isInWishlist ? "bg-primary text-on-primary" : "text-primary hover:bg-primary hover:text-on-primary"}`}
            onClick={handleWishlistClick}
          >
            Wishlist
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/30">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              PUBLISHED
            </span>
            <span className="font-body-md text-body-md">{yearPublished}</span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              SOLD
            </span>
            <span className="font-body-md text-body-md">{soldCount}</span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
              GENRE
            </span>
            <span className="font-body-md text-body-md">{genre}</span>
          </div>
        </div>
      </div>
      <AddToCartModal
        open={openAddCartModal}
        onClose={() => setOpenAddCartModal(false)}
        onConfirm={hadleConfirmAddToCart}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    </div>
  );
}
