import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errors, className, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && <label htmlFor={rest.id}>{label}</label>}
        <input
          name={label}
          ref={ref}
          className={ twMerge("border-2 border-solid px-2 py-1" ,errors ? "border-red-600" : "border-secondary-light",className)}
          {...rest}
        />
        {errors && <span className="text-sm text-red-600">{errors}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
