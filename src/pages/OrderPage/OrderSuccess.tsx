import { useParams } from "react-router-dom";
import orderSuccess from "../../assets/ordersuccess.png";

export default function OrderSuccess() {
  const { orderNumber } = useParams();
  const now = new Date();

  const currentTime = now.toLocaleString("vi-VN");
  return (
    <main className="flex-grow flex items-center justify-center py-section-gap px-gutter md:px-margin-page">
      <div className="max-w-3xl w-full flex flex-col items-center text-center">
        <div className="mb-8 relative flex items-center justify-center h-32 w-32 rounded-full bg-surface-container border border-outline-variant/20 shadow-[0_8px_30px_rgb(224,187,108,0.15)]">
          <span
            className="material-symbols-outlined text-5xl text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-primary mb-4">
          Your order is confirmed
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto mb-12">
          Thank you for your purchase. Your curated selection is being prepared
          with care and will be on its way to your library shortly.
        </p>

        <div className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-8 md:p-12 mb-12 flex flex-col md:flex-row gap-8 justify-around items-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #765a14 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          ></div>
          <div className="text-center md:text-left z-10">
            <h2 className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-2">
              Order Number
            </h2>
            <p className="font-headline-md text-headline-md text-on-surface">
              {orderNumber || "ORD-1234"}
            </p>
          </div>
          <div className="hidden md:block w-px h-16 bg-outline-variant/30 z-10"></div>
          <div className="text-center md:text-left z-10">
            <h2 className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-2">
              Estimated Delivery
            </h2>
            <p className="font-headline-md text-headline-md text-on-surface">
              {currentTime}
            </p>
          </div>
        </div>

        <div className="w-full h-48 md:h-64 mb-12 rounded-lg overflow-hidden border border-outline-variant/20">
          <img
            alt="Tactile detail of an old book."
            className="w-full h-full object-cover object-center opacity-90 transition-opacity duration-700 hover:opacity-100"
            data-alt="A close-up, highly detailed photograph of a vintage, leather-bound book resting on a clean, light cream surface. Next to the book is a deep burgundy red wax seal that has been freshly stamped. The lighting is soft, warm, and natural, creating gentle shadows that highlight the tactile textures of the paper and leather. The overall aesthetic is refined, quiet, and intellectual, perfectly aligning with a minimalist, high-end library identity using warm taupe and gold tones."
            src={orderSuccess}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <a
            className="inline-flex justify-center items-center px-8 py-4 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded DEFAULT transition-colors hover:bg-primary hover:text-on-primary border border-transparent"
            href="/store"
          >
            Continue Shopping
          </a>
          <a
            className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-primary font-label-sm text-label-sm rounded DEFAULT border border-primary transition-colors hover:bg-surface-container"
            href="#"
          >
            View Order Details
          </a>
        </div>
      </div>
    </main>
  );
}
