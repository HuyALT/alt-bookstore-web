import { useParams } from "react-router-dom";

export default function OrderDetail() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-6 md:px-margin-page py-12 md:py-24 space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/30 pb-8">
        <div>
          <a
            className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-6 hover:text-primary transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>{" "}
            Back to Orders
          </a>
          <h1 className="font-headline-xl text-headline-xl mb-2 text-on-surface">
            Order #ALT-82941
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Placed on October 12, 2023
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          <span className="font-label-sm text-label-sm text-on-surface">
            Delivered
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h2 className="font-headline-md text-headline-md mb-8">Items</h2>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-24 md:w-32 aspect-[2/3] flex-shrink-0 bg-surface-container-low border border-outline-variant/20 overflow-hidden relative">
                  <img
                    alt="Book cover"
                    className="w-full h-full object-cover"
                    data-alt="A minimalist photograph of a beautifully bound hardcover book with a cream dust jacket, resting on a soft taupe linen surface. The lighting is natural and diffused, casting gentle shadows that emphasize the book's high-quality texture. The mood is intellectual, calm, and sophisticated, perfectly aligned with a premium literary aesthetic in a light-mode layout."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZZ1NUzuyUO3fJkYeZECWdlztVcV1QdxORpb4qYs9EtIECkiMnRark0NlKTqsHjKwiv7qV_3iatxKWGxRriQe453UPAMP3QfWE7Y5dp6iqXEomHuTd3LIDFQcM3SkvGkEF_TgkNxDB_Wddyx8EaK8_LORejhqtOHj1C9q3upJS84q_MFiNLoGGxBc8YdwllhrdcP0ugBF3yPZQZmY-Sm4wfhVQF61SCe3wRu1wV4yTVIs1kfq_Xz4qeiFNJdYWtGTRYIY8-NGOvY"
                  />
                </div>
                <div className="flex flex-col justify-between py-2 flex-grow border-b border-outline-variant/20 pb-6 group-last:border-0 group-last:pb-2">
                  <div>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">
                      The Architecture of Happiness
                    </h3>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                      Alain de Botton
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-3 py-1 rounded">
                      Qty 1
                    </span>
                    <span className="font-body-lg text-body-lg text-on-surface">
                      $34.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-low p-8 border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md mb-8">Journey</h2>
            <div className="relative">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-outline-variant/50"></div>
              <div className="flex items-start gap-6 mb-8 relative">
                <div className="w-6 h-6 rounded-full bg-primary-container border-4 border-surface-container-low z-10 flex-shrink-0"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-primary mb-1">
                    Oct 14, 2023 · 2:30 PM
                  </p>
                  <p className="font-body-md text-body-md">Delivered</p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Package left at front door.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 mb-8 relative">
                <div className="w-6 h-6 rounded-full bg-outline-variant border-4 border-surface-container-low z-10 flex-shrink-0"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                    Oct 13, 2023 · 9:15 AM
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Shipped
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-outline-variant border-4 border-surface-container-low z-10 flex-shrink-0"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                    Oct 12, 2023 · 4:05 PM
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Order Placed
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container p-8 border border-outline-variant/30">
            <h2 className="font-headline-md text-headline-md mb-6">Summary</h2>
            <div className="space-y-4 font-body-md text-body-md text-on-surface-variant mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$34.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$8.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$3.57</span>
              </div>
            </div>
            <div className="flex justify-between pt-6 border-t border-outline-variant/30 font-headline-lg text-headline-lg text-on-surface">
              <span>Total</span>
              <span>$45.57</span>
            </div>
            <div className="mt-8 space-y-4">
              <button className="w-full py-4 px-6 bg-primary-container text-on-primary-container font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-colors flex justify-center items-center gap-2 group">
                <span className="material-symbols-outlined text-sm">
                  refresh
                </span>{" "}
                Buy Again
              </button>
              <button className="w-full py-4 px-6 border border-primary text-primary font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  download
                </span>{" "}
                Download Invoice
              </button>
            </div>
          </section>

          <section className="p-8 border border-outline-variant/30">
            <h2 className="font-headline-md text-headline-md mb-6">Shipping</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase">
                  Address
                </h3>
                <address className="not-italic font-body-md text-body-md text-on-surface">
                  Jane Doe
                  <br />
                  1284 Archival Lane
                  <br />
                  New York, NY 10001
                </address>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase">
                  Method
                </h3>
                <p className="font-body-md text-body-md text-on-surface">
                  Standard Shipping
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
