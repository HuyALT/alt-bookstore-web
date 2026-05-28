import { useEffect, useState } from "react";
import type { items, CartResponse } from "../../types/response/CartResponse";
import { useToast } from "../../components/ToastContext";
import {
  decrementItem,
  getCart,
  incrementItem,
  removeItemFromCart,
} from "../../services/CartApi";

export default function Cart() {
  const [cartItems, setCartItems] = useState<items[]>([]);
  const [cartResponse, setCartResponse] = useState<CartResponse>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const { showToast } = useToast();
  const isEmptyCart = cartResponse && cartResponse.totalItems === 0;

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await getCart();
        if (!response.success) {
          showToast("error", response.message);
        } else {
          setCartResponse(response.data);
          setCartItems(response.data.items);
        }
      } catch (error) {
        showToast("error", "Failed to load cart. Please try again.");
      }
    }

    fetchCart();
  }, []);

  const handleIncrement = async (bookId: string) => {
    const response = await incrementItem(bookId);
    if (!response.success) {
      showToast("error", response.message);
    } else {
      setCartResponse(response.data);
      setCartItems(response.data.items);
    }
  };

  const handleDecrement = async (bookId: string) => {
    const response = await decrementItem(bookId);
    if (!response.success) {
      showToast("error", response.message);
    } else {
      setCartResponse(response.data);
      setCartItems(response.data.items);
    }
  };

  const handleRemove = async (bookId: string) => {
    const response = await removeItemFromCart(bookId);
    if (!response.success) {
      showToast("error", response.message);
    } else {
      setCartResponse(response.data);
      setCartItems(response.data.items);
    }
  };

  return (
    <main className="pt-32 pb-section-gap max-w-container mx-auto px-margin-page">
      <div className="flex justify-center mb-16">
        <div className="flex items-center space-x-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm">
              1
            </span>
            <span className="font-label-sm text-label-sm text-primary uppercase">
              Cart
            </span>
          </div>
          <div className="w-16 h-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-3 opacity-40">
            <span className="w-8 h-8 rounded-full border border-outline text-on-surface flex items-center justify-center text-label-sm">
              2
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Shipping
            </span>
          </div>
          <div className="w-16 h-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-3 opacity-40">
            <span className="w-8 h-8 rounded-full border border-outline text-on-surface flex items-center justify-center text-label-sm">
              3
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Payment
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <section className="lg:col-span-8">
          <h1 className="font-headline-xl text-headline-xl mb-10">Your Cart</h1>

          <div className="space-y-12">
            {isEmptyCart ? (
              <div className="py-20 border border-outline-variant/20 rounded text-center">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">
                  shopping_cart
                </span>

                <p className="font-headline-md text-headline-md text-on-surface mb-2">
                  Your cart is empty
                </p>

                <p className="font-body-md text-body-md text-on-surface-variant">
                  Add some books to your cart before checkout.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {cartItems.map((item) => (
                  <div
                    key={item.bookId}
                    className="flex flex-col md:flex-row gap-8 pb-12 border-b border-outline-variant/20"
                  >
                    <div className="w-full md:w-40 aspect-[3/4] bg-surface-container overflow-hidden rounded">
                      <img
                        className="w-full h-full object-cover grayscale-[0.2]"
                        src={item.coverImageUrl}
                        alt={item.title}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h2 className="font-headline-md text-headline-md">
                            {item.title}
                          </h2>

                          <div className="text-right shrink-0">
                            <p className="font-body-md text-body-md text-primary">
                              ${item.unitPrice.toFixed(2)}
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                              Total ${item.lineTotal.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <p className="font-body-md text-body-md text-on-surface-variant mb-4 italic">
                          by {item.author}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center border border-outline-variant/40 rounded px-4 py-2 space-x-6">
                          <button
                            type="button"
                            className="material-symbols-outlined text-on-surface-variant hover:text-primary"
                            onClick={() => handleDecrement(item.bookId)}
                          >
                            remove
                          </button>

                          <span className="font-body-md">{item.quantity}</span>

                          <button
                            type="button"
                            className="material-symbols-outlined text-on-surface-variant hover:text-primary"
                            onClick={() => handleIncrement(item.bookId)}
                          >
                            add
                          </button>
                        </div>

                        <button
                          type="button"
                          className="font-label-sm text-label-sm text-on-surface-variant hover:text-error transition-colors uppercase border-b border-transparent hover:border-error"
                          onClick={() => handleRemove(item.bookId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <aside className="lg:col-span-4">
          <div className="sticky top-32 bg-surface p-8 border border-outline-variant/20 rounded shadow-sm">
            <h2 className="font-headline-md text-headline-md mb-8">Subtotal</h2>
            <div className="space-y-4 pb-8 border-b border-outline-variant/20">
              <div className="flex justify-between text-on-surface-variant">
                <span className="font-body-md">Total Items</span>
                <span className="font-body-md">
                  {isEmptyCart ? 0 : cartResponse.totalItems}
                </span>
              </div>
            </div>
            <div className="py-8 space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="font-headline-md text-headline-md">Total</span>
                <span className="font-headline-md text-headline-md text-primary">
                  {isEmptyCart
                    ? "$0.00"
                    : `$${cartResponse.totalPrice.toFixed(2)}`}
                </span>
              </div>
              <button
                className="w-full py-5 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isEmptyCart}
              >
                Proceed to Shipping
              </button>
              <p className="text-center font-label-sm text-label-sm text-on-surface-variant opacity-60 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[14px]">
                  lock
                </span>
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>

          <div className="mt-8 p-8 border border-outline-variant/10 rounded">
            <h4 className="font-body-lg text-body-lg mb-2">Need assistance?</h4>
            <p className="font-body-md text-on-surface-variant text-sm mb-6">
              Our curators are available to assist with your order 9am—6pm EST.
            </p>
            <a
              className="font-label-sm text-label-sm text-primary uppercase border-b border-primary/20 hover:border-primary pb-1 transition-all inline-block"
              href="#"
            >
              Contact Concierge
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
