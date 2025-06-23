import { twMerge } from "tailwind-merge";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outlined" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => {
    const variants = {
      primary: "bg-accent text-white hover:bg-accent-hover",
      outlined: "bg-white border-2 border-accent hover:bg-primary",
      ghost: "bg-none"
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          "cursor-pointer rounded-md px-4 py-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
