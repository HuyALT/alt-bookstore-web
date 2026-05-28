import FeatureBook from "./FeatureBook";
import Hero from "./Hero";
import NwBookArrival from "./NwBookArrival";
export default function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <FeatureBook />
      <NwBookArrival />
      <section className="py-section-gap bg-surface">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 italic">
              Join Us
            </h2>
            <button className="bg-primary text-on-primary px-10 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/90 transition-colors">
              Register Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
