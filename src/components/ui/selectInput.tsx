import { capitalize } from "@/core/utils/capitalize";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface SelectInputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  errors?: string;
  data: { value: any; text: string }[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ data, label, errors, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label htmlFor={label.trim()} className="font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          {...rest}
          ref={ref}
          className={twMerge(
            "rounded-lg border-2 border-solid px-2 py-1 shadow-md shadow-gray-500/50",
            errors ? "border-red-600" : "border-gray-400",
            rest.className,
          )}
        >
          {data.map((d) => (
            <option key={d.value} value={d.value}>
              {capitalize(d.text)}
            </option>
          ))}
        </select>

        {errors && <span className="text-sm text-red-600">{errors}</span>}
      </div>
    );
  },
);

SelectInput.displayName = "selectInput";
