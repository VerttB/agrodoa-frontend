interface ItemPageRootProps {
  children: React.ReactNode;
}

export const ItemPageRoot = ({ children }: ItemPageRootProps) => {
  return <div className="bg-primary relative z-0 min-h-screen">{children}</div>;
};
