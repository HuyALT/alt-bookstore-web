import { ArrowRight, ShoppingBag, UserRound, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UserProfile } from "../types/response/UserProfile";
import { getCurrentUser } from "../services/AuthApi";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res.success) {
          setCurrentUser(res.data);
        } else {
          console.log("No User Login");
        }
      } catch (error) {
        console.error("No user Login current user:");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) return;

    navigate(`/archive?keyword=${encodeURIComponent(value)}`);
    setKeyword("");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-outline-variant/20 bg-surface/90 backdrop-blur-xl shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a
          href="/"
          className="font-headline-lg text-2xl font-bold text-primary tracking-tight"
        >
          ALT
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            className="font-label-sm text-label-sm text-primary border-b-2  hover:text-primary  transition-colors duration-300"
            href="#"
          >
            Browse
          </a>

          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="/store"
          >
            BookStore
          </a>

          <a
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300"
            href="#"
          >
            About us
          </a>
        </div>

        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center w-72 relative group"
          >
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant group-focus-within:text-primary transition-colors duration-300 !text-[18px]">
              search
            </span>

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="
                w-full
                rounded-full
                border border-outline-variant/40
                bg-surface-container-low
                pl-10 pr-12 py-2
                text-label-sm font-label-sm
                text-on-surface
                placeholder:text-on-surface-variant/50
                outline-none
                focus:border-primary
                focus:bg-surface-container-lowest
                transition-all duration-300
              "
              placeholder="Search books..."
              type="text"
            />

            <button
              type="submit"
              className="
                absolute right-1.5
                w-8 h-8
                flex items-center justify-center
                rounded-full
                text-primary
                hover:bg-surface-container-highest
                active:scale-95
                transition-all duration-200
              "
              aria-label="Search"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          <Link
            to="/cart"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              text-primary
              hover:bg-surface-container-highest
              active:scale-95
              transition-all duration-200
            "
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingBag size={22} />
          </Link>
          <Link
            to="/wishlist"
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              text-primary
              hover:bg-surface-container-highest
              active:scale-95
              transition-all duration-200
            "
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart size={22} fill="#644a02" />
          </Link>
          {loadingUser ? (
            <div className="h-10 w-24 rounded-full bg-surface-container-low animate-pulse" />
          ) : currentUser ? (
            <Link
              to="/my-profile"
              className="
                flex items-center gap-2
                rounded-full
                border border-outline-variant/40
                bg-surface-container-low
                px-4 py-2
                text-primary
                hover:bg-surface-container-highest
                transition-all duration-200
              "
            >
              <UserRound size={18} />

              <span className="max-w-28 truncate font-label-sm text-label-sm font-semibold">
                {currentUser.name}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="
                rounded-full
                border border-primary
                px-5 py-2
                font-label-sm text-label-sm
                text-primary
                hover:bg-primary hover:text-on-primary
                transition-all duration-300
              "
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
