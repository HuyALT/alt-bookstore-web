import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { createPortal } from "react-dom";

export type ToastType = "info" | "success" | "error";

type ToastProps = {
  type: ToastType;
  message: string;
  onClose: () => void;
};

export default function Toast({ type, message, onClose }: ToastProps) {
  const config = {
    info: {
      title: "Thông báo",
      icon: <Info size={20} />,
      className:
        "border-primary/20 bg-primary-container text-on-primary-container",
    },
    success: {
      title: "Thành công",
      icon: <CheckCircle2 size={20} />,
      className: "border-green-200 bg-green-50 text-green-700",
    },
    error: {
      title: "Lỗi",
      icon: <AlertCircle size={20} />,
      className: "border-error/20 bg-error-container text-on-error-container",
    },
  };

  const current = config[type];

  return createPortal(
    <div
      className={`
      fixed
      left-4 right-4 bottom-6
      sm:left-6 sm:right-auto sm:w-[340px]
      z-[9999]
      border
      shadow-lg
      px-4 py-4
      flex items-start gap-3
      animate-[slideIn_0.25s_ease-out]
      ${current.className}
    `}
    >
      <div className="mt-0.5 shrink-0">{current.icon}</div>

      <div className="flex-1">
        <h4 className="font-label-sm text-label-sm font-semibold mb-1">
          {current.title}
        </h4>

        <p className="font-body-md text-body-md leading-relaxed">{message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>,
    document.body,
  );
}
