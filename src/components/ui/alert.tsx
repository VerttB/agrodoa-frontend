import React from "react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
  show?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  message,
  onClose,
  show = true,
}) => {
  if (!show) return null;

  const bgColor = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  }[type];

  return (
    <div
      role="alert"
      className={`
        fixed
        top-[5%]
        left-1/2
        transform -translate-x-1/2
        max-w-lg
        w-[90%]
        p-4
        rounded-md
        shadow-lg
        flex items-center justify-between
        ${bgColor}
        z-50
      `}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold text-xl leading-none focus:outline-none"
          aria-label="Fechar alerta"
        >
          &times;
        </button>
      )}
    </div>
  );
};
