import { ReactNode } from "react";

interface SidebarHeaderProps {
  children: ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return (
    <div className="px-4 py-2 border-b border-gray-200">
      {children}
    </div>
  );
}
