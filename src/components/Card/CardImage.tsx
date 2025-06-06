import Image from "next/image";

interface CardImageProps {
  alt: string;
  className?: string;
  imageUrl: string;
}

export const CardImage = ({ imageUrl, alt, className }: CardImageProps) => {
  return (
    <div
      className={`relative h-[140px] rounded-t-lg border-1 border-gray-300 ${className}`}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="rounded-t-lg object-cover"
      />
    </div>
  );
};
