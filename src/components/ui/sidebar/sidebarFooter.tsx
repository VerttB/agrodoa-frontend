import { ReactNode } from "react";

interface SidebarFooterProps {
  children: ReactNode;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
  return (
    <div className="px-4 py-2 border-t border-gray-200">
      {children}
    </div>
  );
}
