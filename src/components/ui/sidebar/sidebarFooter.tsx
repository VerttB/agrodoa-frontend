import { ReactNode } from "react";

interface SidebarFooterProps {
  children: ReactNode;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
  return <div className="border-t border-gray-200 px-4 py-2">{children}</div>;
}
