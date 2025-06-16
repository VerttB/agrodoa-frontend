interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

export const CardActions = ({ children, className = "" }: CardActionsProps) => {
  return (
    <div className={`flex justify-end gap-2 border-t ${className}`}>
      {children}
    </div>
  );
};
