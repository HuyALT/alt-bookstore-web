import { CircleCheck } from "lucide-react";

export default function Shipping() {
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
              Payment
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
              <label className="flex-shrink-0 w-[280px] p-4 border border-primary bg-surface-container-low rounded-DEFAULT cursor-pointer transition-colors group relative">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                      Home (Default)
                    </span>
                    <input
                      checked
                      className=" w-5 h-5
                      accent-[#765a14]
                        cursor-pointer
                        focus:ring-0
                        focus:outline-none"
                      name="saved_address"
                      type="radio"
                      value="home"
                    />
                  </div>
                  <p className="font-body-md text-body-md font-medium">
                    Jane Doe
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    1284 Archival Lane
                    <br />
                    New York, 10001
                  </p>
                </div>
              </label>
              <label className="flex-shrink-0 w-[280px] p-4 border border-outline-variant hover:border-primary bg-transparent rounded-DEFAULT cursor-pointer transition-colors group relative">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                      Office
                    </span>
                    <input
                      className="w-5 h-5
                      accent-[#765a14]
                        cursor-pointer
                        focus:ring-0
                        focus:outline-none"
                      name="saved_address"
                      type="radio"
                      value="office"
                    />
                  </div>
                  <p className="font-body-md text-body-md font-medium">
                    Jane Doe
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    89 Bibliophile Street
                    <br />
                    New York, 10012
                  </p>
                </div>
              </label>
              <button className="flex-shrink-0 w-[280px] p-4 border border-dashed border-outline-variant hover:border-primary rounded-DEFAULT flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
                <span className="material-symbols-outlined text-2xl">
                  add_circle
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest">
                  Add New Address
                </span>
              </button>
            </div>
            <div className="mt-4 p-4 bg-surface-container-highest/30 border-l-2 border-primary">
              <p className="font-body-md text-body-md italic text-on-surface-variant">
                The form below is currently populated with your selected
                address. Edit below to update this shipment only.
              </p>
            </div>
          </section>
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
                    placeholder="Jane Doe"
                    type="text"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                    Address line 1
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                    id="address"
                    placeholder="123 ABC Street, District 123"
                    type="text"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                    Address line 2 (Optional)
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                    id="address"
                    placeholder="ABC Building, Room 123 or additional addresss"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                    City
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                    id="city"
                    placeholder="New York"
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                    Postal Code
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                    id="postal"
                    placeholder="10001"
                    type="text"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md transition-colors placeholder:text-on-surface-variant/50"
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
              </div>
            </form>
          </section>
          <section className="pt-8 border-t border-outline-variant/30">
            <h2 className="font-headline-md text-headline-md mb-8">
              Shipping Method
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-outline-variant rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors group has-[:checked]:border-primary has-[:checked]:bg-surface-container-low">
                <div className="flex items-center gap-4">
                  <input
                    className="text-primary focus:ring-primary border-outline-variant"
                    name="shipping_method"
                    type="radio"
                    value="standard"
                    checked={true}
                  />
                  <div>
                    <div className="font-body-md text-body-md font-medium group-has-[:checked]:text-primary">
                      Standard Shipping
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      3-5 Business Days
                    </div>
                  </div>
                </div>
                <div className="font-body-md text-body-md">$8.00</div>
              </label>

              <label className="flex items-center justify-between p-4 border border-outline-variant rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors group has-[:checked]:border-primary has-[:checked]:bg-surface-container-low">
                <div className="flex items-center gap-4">
                  <input
                    className="text-primary focus:ring-primary border-outline-variant"
                    name="shipping_method"
                    type="radio"
                    value="express"
                  />
                  <div>
                    <div className="font-body-md text-body-md font-medium group-has-[:checked]:text-primary">
                      Express Shipping
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      1-2 Business Days
                    </div>
                  </div>
                </div>
                <div className="font-body-md text-body-md">$15.00</div>
              </label>

              <label className="flex items-center justify-between p-4 border border-outline-variant rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors group has-[:checked]:border-primary has-[:checked]:bg-surface-container-low">
                <div className="flex items-center gap-4">
                  <input
                    className="text-primary focus:ring-primary border-outline-variant"
                    name="shipping_method"
                    type="radio"
                    value="courier"
                  />
                  <div>
                    <div className="font-body-md text-body-md font-medium group-has-[:checked]:text-primary">
                      Premium Courier
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      Same Day (Order before 2 PM)
                    </div>
                  </div>
                </div>
                <div className="font-body-md text-body-md">$25.00</div>
              </label>
            </div>
          </section>
          <div className="pt-8">
            <button className="w-full md:w-auto bg-primary-container text-on-primary-container px-8 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-inverse-primary transition-colors duration-300 rounded-DEFAULT">
              Continue to Payment
            </button>
          </div>
        </div>

        <aside className="w-full lg:w-1/3 bg-surface-container-low p-8 rounded-DEFAULT sticky top-8">
          <h3 className="font-headline-md text-headline-md mb-6 border-b border-outline-variant/30 pb-4">
            Order Summary
          </h3>

          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="w-20 h-28 bg-surface-variant flex-shrink-0 relative overflow-hidden rounded-sm">
                <img
                  alt="Book cover"
                  className="w-full h-full object-cover"
                  data-alt="A close-up of a sophisticated, minimalist hardcover book lying on a clean surface. The lighting is soft and natural, emphasizing the texture of the paper and the elegant serif typography on the cover. The color palette is composed of muted taupes, creams, and subtle gold accents, reflecting a high-end, intellectual aesthetic."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYkgIWWaaBJhgBAUs8QLboWmtCZMoqWkUzasDG3k67C3ejjehKwNyZHRCxOsIOo-CTD-xp7-S2nojDE60KIdr4HyMOcwXIhyUeBZl6ykAwgqVkWwRWYMuFNNXOYSPvqn-OT6uzbTZTbIzMKMEEWoKoQAgi0YLhSiyfKMa1utpw0t8WxY9BxjVwQ88iQRrrPe2h_kzr3kxeTIkKvxrRUBtA6TO3OQaDRsBq8dzUaAjiVmpxLanNpQcfr2NV5OTGysXU4-CAZawGxx0"
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-headline-md text-body-lg leading-tight mb-1">
                    The Architecture of Light
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Hardcover
                  </p>
                </div>
                <p className="font-body-md text-body-md">$45.00</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-20 h-28 bg-surface-variant flex-shrink-0 relative overflow-hidden rounded-sm">
                <img
                  alt="Book cover"
                  className="w-full h-full object-cover"
                  data-alt="Another minimalist hardcover book featured from a slightly different angle, showcasing its spine and front cover. The setting is bright and serene, with soft shadows cast on a pristine, light-toned desk. The book exhibits a quiet, luxurious design with subtle debossed lettering and a minimalist, tactile feel, perfectly aligned with a curated library environment."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqYnXor_mhktURh6Gbrl8yejGmBYk78y2bMmIW9gx5QtxPolJqZrXWb2U-lfxuIfrT8N6it-qN3NbPqbUl_ofTkvsoUntpW3QSRkQ1znXOYfjB51p8p2Xaivq4gTQFOjEt5TuLCdq_pM716hk2vdwf1oRq887xY7ckANKnnzCR1kp2y49oU640_87MKXdd03XSMC3r20ZTbZVVwLWmHXs50ZM86GWHUXDGlLFUqgpd7UAALmIai5WFP499kY-uCvPV9y70qy_f99w"
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-headline-md text-body-lg leading-tight mb-1">
                    Modernism Revisited
                  </h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Limited Edition
                  </p>
                </div>
                <p className="font-body-md text-body-md">$60.00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-outline-variant/30 pt-6 space-y-4">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md text-body-md">Subtotal</span>
              <span className="font-body-md text-body-md">$105.00</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md text-body-md">Shipping</span>
              <span className="font-body-md text-body-md">
                Calculated at next step
              </span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-body-md text-body-md">Taxes</span>
              <span className="font-body-md text-body-md">$8.40</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30 mt-4">
              <span className="font-headline-md text-headline-md">Total</span>
              <span className="font-headline-md text-headline-md">$113.40</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
