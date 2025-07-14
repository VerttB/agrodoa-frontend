import { ReactNode } from "react";

interface SidebarHeaderProps {
  children: ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div className="border-b border-gray-200 px-4 py-2">{children}</div>;
}
