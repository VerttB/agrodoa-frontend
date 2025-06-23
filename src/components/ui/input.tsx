import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  className?: string;
  leftIcon?: LucideIcon,
  rightIcon?: LucideIcon
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errors, className,rightIcon:RightIcon, leftIcon:LeftIcon, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && <label htmlFor={rest.id}>{label}</label>}

       <div className="relative w-full">
          {LeftIcon && (
            <LeftIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          )}
        <input
          name={label}
          ref={ref}
          className={ twMerge("border-2 border-solid px-2 py-1" ,errors ? "border-red-600" : "border-secondary-light",className)}
          {...rest}
        />
         {RightIcon && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <RightIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"/>
            </div>
          )}
        </div>
        {errors && <span className="text-sm text-red-600">{errors}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

