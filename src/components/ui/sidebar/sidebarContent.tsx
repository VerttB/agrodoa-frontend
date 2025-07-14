import { ReactNode } from "react";

interface SidebarContentProps {
  children: ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  return <div className="flex-1 overflow-y-auto p-4">{children}</div>;
}
