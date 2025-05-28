import Image from "next/image";

interface CardImageProps {
  alt: string;
  size: number;
  imageUrl: string;
}

export const CardImage = ({ imageUrl, alt, size }: CardImageProps) => {
  return (
    <div className="relative w-full border-gray-300 border-1 h-[120px]">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover rounded-t-lg"
      />
    </div>
  );
};
