interface CardRootProps {
  children: React.ReactNode;
  className?: string;
}

export const CardRoot: React.FC<CardRootProps> = ({
  children,
  className,
}: CardRootProps) => {
  return (
    <div
      className={`bg-neutral rounded-md border-1 border-gray-300 shadow ${className} `}
    >
      {children}
    </div>
  );
};
