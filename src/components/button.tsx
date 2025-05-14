interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outlined";
  className?: string;
  type?: "button" | "reset";
}

export default function Button({
  variant = "primary",
  children,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const variants = {
    primary: "bg-accent font-white hover:bg-accent-hover",
    outlined: "bg-white border-2 border-accent border-solid",
  };
  return (
    <button
      type={type}
      className={`cursor-pointer rounded-md ${className} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
