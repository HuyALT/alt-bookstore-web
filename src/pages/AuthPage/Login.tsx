import { useState, type SyntheticEvent } from "react";
import { login } from "../../services/AuthApi";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await login({ email, password, guestId: null });

      navigate("/");
    } catch (error) {
      setMessage("Email hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-gutter py-section-gap">
      <div className="w-full max-w-md bg-surface border border-outline-variant/10 p-10 flex flex-col items-center">
        <header className="mb-12 text-center">
          <h1
            className="font-headline-lg text-headline-lg text-primary tracking-tight mb-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            ALT
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant italic">
            The Curator’s Library
          </p>
        </header>

        <section className="w-full">
          {message && (
            <div className="mb-6 border border-error/20 bg-error-container text-on-error-container px-4 py-3 font-body-md text-body-md">
              {message}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="relative group">
              <label
                htmlFor="email"
                className="font-label-sm text-label-sm text-on-surface-variant block mb-2"
              >
                Email Address
              </label>

              <input
                className="  
                w-full
                rounded-xl
              bg-surface-container-low
                border border-outline-variant/40
                px-4 py-3
                font-body-md text-body-md text-on-surface
               placeholder:text-on-surface-variant/50
                focus:outline-none
               focus:border-primary
               focus:bg-surface-container-lowest
                 transition-all duration-300"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="font-label-sm text-label-sm text-on-surface-variant block"
                >
                  Password
                </label>

                <a
                  className="font-label-sm text-label-sm text-primary hover:opacity-80 transition-opacity"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>

              <input
                className="  
                w-full
                rounded-xl
               bg-surface-container-low
                border border-outline-variant/40
                px-4 py-3
                font-body-md text-body-md text-on-surface
               placeholder:text-on-surface-variant/50
                focus:outline-none
              focus:border-primary
              focus:bg-surface-container-lowest
                transition-all duration-300"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                className="w-full bg-primary-container text-on-primary-fixed font-label-sm text-label-sm py-4 px-8 flex items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-colors duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "LOGGING IN..." : "LOGIN"}
              </button>
            </div>
          </form>
        </section>

        <footer className="mt-12 w-full border-t border-outline-variant/20 pt-8 text-center">
          <Link
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            to="/register"
          >
            Don't have an account?
          </Link>
        </footer>
      </div>
    </main>
  );
}
