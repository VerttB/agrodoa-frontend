import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errors,
      className,
      rightIcon: RightIcon,
      leftIcon: LeftIcon,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label className="font-medium text-gray-700" htmlFor={rest.id}>
            {label}
          </label>
        )}

        <div className="relative w-full">
          {LeftIcon && (
            <LeftIcon className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
          )}
          <input
            name={label}
            ref={ref}
            className={twMerge(
              "rounded-lg border-2 border-solid px-2 py-1 shadow-md shadow-gray-500/50",
              errors ? "border-red-600" : "border-gray-400",
              className,
            )}
            {...rest}
          />
          {RightIcon && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <RightIcon className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
            </div>
          )}
        </div>
        {errors && <span className="text-sm text-red-600">{errors}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
