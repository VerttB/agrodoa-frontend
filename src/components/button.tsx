import { twMerge } from "tailwind-merge";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outlined";
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  variant = "primary",
  children,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    outlined: "bg-white border-2 border-accent border-solid hover:",
  };
  return (
    <button
      type={type}
      className={twMerge(
        "cursor-pointer rounded-md",
        variants[variant],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
