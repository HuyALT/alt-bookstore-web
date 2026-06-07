import { useEffect, useState } from "react";
import { type OrderResponse } from "../../types/response/OrderResponse";
import { myOrders } from "../../services/OrderApi";

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await myOrders(page, size);
        const data = response.data;
        setTotalPages(response.totalPages);

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [page, size]);
  return (
    <main className="flex-grow max-w-container mx-auto w-full px-margin-page py-section-gap flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h1 className="font-headline-xl text-headline-xl text-on-background">
          Order History
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          An archival record of your curated selections. Review past
          acquisitions and track current shipments.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div className="bg-surface-container rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start md:items-center border border-outline-variant/30 hover:border-outline-variant transition-colors group">
            <div className="w-24 h-32 flex-shrink-0 bg-surface-variant rounded overflow-hidden shadow-sm relative">
              <img
                alt="Book Cover"
                className="w-full h-full object-cover"
                data-alt="A sophisticated, minimalist book cover resting on a neutral taupe surface. The lighting is soft and diffused, highlighting the elegant serif typography on the cover. The overall aesthetic is calm, intellectual, and luxurious, fitting a high-end curation library."
                src={order.items[0].coverImageUrl}
              />
            </div>

            <div className="flex-grow flex flex-col gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                  #{order.orderNumber}
                </span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {order.placeAt}
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-background group-hover:text-primary transition-colors">
                  {order.items.slice(0, 3).map((item) => (
                    <span key={item.bookid}>
                      {item.bookTitle} x {item.quantity}
                    </span>
                  ))}
                  {order.items.length > 3 && <span>...</span>}
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4 min-w-[140px]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-container/20 rounded-full border border-primary-container/30">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="font-label-sm text-label-sm text-on-primary-container">
                  {order.status}
                </span>
              </div>
              <span className="font-body-lg text-body-lg text-on-background">
                {order.total}
              </span>
              <button className="text-primary font-label-sm text-label-sm hover:underline underline-offset-4 decoration-primary/30 mt-2">
                View Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 mt-12">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="
      px-4 py-2
      border border-outline-variant
      rounded-full
      text-on-surface-variant
      hover:text-primary
      hover:border-primary
      disabled:opacity-30
      disabled:cursor-not-allowed
      transition-colors
    "
        >
          Prev
        </button>

        <span className="px-4 py-2 text-on-surface-variant">
          Page <span className="text-primary font-semibold">{page + 1}</span> /{" "}
          {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="
      px-4 py-2
      border border-outline-variant
      rounded-full
      text-on-surface-variant
      hover:text-primary
      hover:border-primary
      disabled:opacity-30
      disabled:cursor-not-allowed
      transition-colors
    "
        >
          Next
        </button>
      </div>
    </main>
  );
}
