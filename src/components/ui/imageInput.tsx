import { forwardRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ImageUpIcon, XIcon } from "lucide-react";
import Image from "next/image";

type OmitValue = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface ImageUploadInputProps extends OmitValue {
  label?: string;
  errors?: string;
  className?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
}

export const ImageUploadInput = forwardRef<HTMLInputElement, ImageUploadInputProps>(
  ({ label, errors, className, value, onChange, ...rest }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
      if (value) {
        const url = URL.createObjectURL(value);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      } else {
        setPreview(null);
      }
    }, [value]);

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange?.(file);
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
    };

    return (
      <div className="flex w-full flex-col gap-1">
        {label && <label>{label}</label>}

        <div
          className={twMerge(
            "relative flex min-h-52 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed bg-white",
            errors ? "border-red-600" : "border-secondary-light",
            className,
          )}
          onClick={() => {
            const input = document.getElementById(rest.id || "image-upload-input");
            input?.click();
          }}
        >
          <input
            id={rest.id || "image-upload-input"}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSelectFile}
            ref={ref}
            {...rest}
          />

          {preview ? (
            <>
              <Image src={preview} alt="Preview" className="absolute inset-0 size-full object-cover rounded-xl" />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <XIcon className="size-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center px-4 py-3">
              <div className="mb-2 flex size-11 items-center justify-center rounded-full border">
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Clique para selecionar uma imagem
              </p>
              <p className="text-muted-foreground text-xs">Máximo 5MB</p>
            </div>
          )}
        </div>

        {errors && <span className="text-sm text-red-600">{errors}</span>}
      </div>
    );
  },
);

ImageUploadInput.displayName = "ImageUploadInput";
