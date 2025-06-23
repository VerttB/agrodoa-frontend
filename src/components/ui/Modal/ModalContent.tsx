interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={`flex flex-col gap-4 p-6 ${className}`}>{children}</div>
  );
};
