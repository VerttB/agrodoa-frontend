interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-4">{children}</div>;
};
