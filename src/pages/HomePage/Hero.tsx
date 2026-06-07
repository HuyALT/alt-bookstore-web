import { useNavigate } from "react-router-dom";
import hero from "../../assets/hero.png";

export default function Hero() {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate("/store");
  };
  return (
    <section className="relative h-204.75 flex items-center overflow-hidden bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-10 w-full grid grid-cols-12 items-center gap-gutter">
        <div className="col-span-12 md:col-span-6 z-10">
          <span className="font-label-sm text-label-sm text-primary mb-6 block">
            ESTABLISHED 1994
          </span>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-8 max-w-lg italic">
            The Curator’s Library
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md">
            A sanctuary for the discerning reader. Explore our hand-picked
            collection of rare editions, contemporary masterpieces, and timeless
            classics.
          </p>
          <div className="flex gap-4">
            <button
              className="px-8 py-4 bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-widest hover:brightness-105 transition-all"
              onClick={handleExploreClick}
            >
              Shopping now
            </button>
            <button className="px-8 py-4 border border-primary text-primary font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/5 transition-all">
              Sign up here
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block">
          <div className="h-full w-full relative">
            <img
              className="h-full w-full object-cover"
              data-alt="A sun-drenched, high-end private library interior with floor-to-ceiling dark wood bookshelves filled with antique books. The atmosphere is warm and scholarly, featuring a sophisticated palette of cream, gold, and deep ebony. Soft afternoon light filters through large windows, illuminating a leather armchair and a minimalist gold reading lamp in a high-key, elegant minimalist style."
              src={hero}
            />
            <div className="absolute inset-0 bg-linear-to-r from-surface-container-low via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
