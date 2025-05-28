import Image from "next/image";

interface CardImageProps {
  alt: string;
  size: number;
  imageUrl: string;
}

export const CardImage = ({ imageUrl, alt, size }: CardImageProps) => {
  return (
    <div className="relative h-[120px] w-full border-1 border-gray-300">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="rounded-t-lg object-cover"
      />
    </div>
  );
};
