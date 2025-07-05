import { ReactNode } from "react";

interface SidebarActionsProps {
  children: ReactNode;
}

export function SidebarActions({ children }: SidebarActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 px-4 py-2">
      {children}
    </div>
  );
}
