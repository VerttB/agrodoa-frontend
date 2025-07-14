export interface ComponenteInterativo {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
