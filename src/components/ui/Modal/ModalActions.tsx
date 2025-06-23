interface ModalActionsProps {
  className?: string;
  children: React.ReactNode;
}

export const ModalActions = ({ className, children }: ModalActionsProps) => {
  return <div className={`flex w-full gap-4 p-2 ${className}`}>{children}</div>;
};
