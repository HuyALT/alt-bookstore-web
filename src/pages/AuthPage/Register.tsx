import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/AuthApi";

export function Register() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim()) {
      setMessage("Vui lòng nhập đầy đủ thông tin.");
      setSuccessMessage("");
      return;
    }

    if (!acceptedTerms) {
      setMessage("Vui lòng đồng ý với điều khoản dịch vụ.");
      setSuccessMessage("");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSuccessMessage("");

      await register({
        userName,
        email,
        password,
        guestId: null,
      });

      setSuccessMessage(
        "Đăng ký thành công. Đang chuyển tới trang đăng nhập...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      setMessage("Đăng ký thất bại. Email hoặc username có thể đã tồn tại.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex-grow flex flex-col md:flex-row min-h-screen">
      <section className="hidden md:flex md:w-5/12 bg-surface-container relative overflow-hidden flex-col justify-between p-12">
        <div className="z-10">
          <span className="font-headline-lg text-headline-lg text-primary tracking-tight block mb-12">
            ALT
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface-variant max-w-sm mb-6">
            A ritual of <span className="italic text-primary">curation</span>{" "}
            and quiet thought.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant/80 max-w-xs">
            Step into a sanctuary where every volume is chosen with intention.
          </p>
        </div>
        <div className="mt-auto z-10 space-y-8">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary mt-1">
              auto_stories
            </span>
            <div>
              <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-1">
                Personal Archives
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant/70">
                Build your own library and save curations from our staff picks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary mt-1">
              ink_pen
            </span>
            <div>
              <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-1">
                Early Access
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant/70">
                Secure first editions and limited archival releases before they
                go public.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <img
            alt=""
            className="w-full h-full object-cover"
            data-alt="A serene, high-end archival bookstore setting with shelves of leather-bound books catching soft, warm morning sunlight. The atmosphere is minimalist and sophisticated, with a palette of cream, taupe, and muted gold. Dust motes dance in a single beam of light hitting a dark wood table, reflecting a timeless ritual of reading and curation."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEao7vmP1bH3BACjeis6LwYrswm50x9tTtxX2EyT7XoRl60WX0qOaNszkKU3eMiM4sa_H1vWB-BDkfcYMthaR4meVjoWl3SEzCd11GhFYEkPbT8GVJV4iwkhTyGPn8cAwHiomJFDEk_5D-jN3HUbjWPTCectLQnFXOANcPKx3qV2rMgrpMQZe2RnPFyQylIyqXQ6zDQspxsVXsHMGyxfpFziPGQn_RPvE2NUIWNeNd3jWGJpuVm8ltq_KhxstqmAnB0wBUis1kmys"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
      </section>

      <section className="w-full md:w-7/12 flex flex-col justify-center items-center px-6 py-12 md:px-margin-page bg-surface-bright">
        <div className="w-full max-w-[420px]">
          <header className="mb-12 text-center md:text-left">
            <div className="md:hidden font-headline-lg text-headline-lg text-primary tracking-tight mb-8">
              ALT
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">
              Join the Library
            </h1>
            <p className="text-on-surface-variant/80">
              Become part of our discerning circle of readers.
            </p>
          </header>
          {message && (
            <div className="mb-6 border border-error/20 bg-error-container text-on-error-container px-4 py-3 font-body-md text-body-md">
              {message}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 border border-primary/20 bg-primary-container text-on-primary-container px-4 py-3 font-body-md text-body-md">
              {successMessage}
            </div>
          )}
          <form className="space-y-8" onSubmit={handleRegister}>
            <div className="group relative">
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2 transition-colors group-focus-within:text-primary uppercase tracking-widest">
                UserName
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 focus:ring-0 focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant/50 font-body-md text-body-md"
                id="full_name"
                name="full_name"
                placeholder="Elias Thorne"
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (message) setMessage("");
                }}
              />
            </div>

            <div className="group relative">
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2 transition-colors group-focus-within:text-primary uppercase tracking-widest">
                Email Address
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 focus:ring-0 focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant/50 font-body-md text-body-md"
                id="email"
                name="email"
                placeholder="elias@example.com"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (message) setMessage("");
                }}
              />
            </div>

            <div className="group relative">
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2 transition-colors group-focus-within:text-primary uppercase tracking-widest">
                Password
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 focus:ring-0 focus:border-primary transition-colors text-on-surface placeholder:text-outline-variant/50 font-body-md text-body-md"
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (message) setMessage("");
                }}
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 bg-transparent"
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (message) setMessage("");
                  }}
                />
              </div>
              <label className="font-body-md text-body-md text-on-surface-variant/80 text-sm">
                I agree to receive the monthly curator's letter and accept the{" "}
                <a
                  className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all"
                  href="#"
                >
                  Terms of Service
                </a>
                .
              </label>
            </div>

            <div className="pt-6">
              <button
                className="w-full bg-primary-container text-on-primary-container py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 transform active:scale-[0.98]"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
          <footer className="mt-12 text-center">
            <p className="text-on-surface-variant/70 font-body-md text-body-md">
              Already have an account?{" "}
              <Link
                className="text-primary font-semibold hover:underline underline-offset-4 transition-all"
                to="/login"
              >
                Sign In
              </Link>
            </p>
          </footer>
          <div className="mt-20 flex justify-center opacity-30">
            <div className="h-[1px] w-12 bg-outline-variant"></div>
            <div className="mx-4 text-primary">
              <span className="material-symbols-outlined">shield_moon</span>
            </div>
            <div className="h-[1px] w-12 bg-outline-variant"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
