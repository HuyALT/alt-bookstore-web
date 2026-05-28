// src/contexts/ToastContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import Toast, { type ToastType } from "../components/Toast";

type ToastState = {
  type: ToastType;
  message: string;
} | null;

type ToastContextValue = {
  showToast: (type: ToastType, message: string) => void;
  closeToast: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
  };

  const closeToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
