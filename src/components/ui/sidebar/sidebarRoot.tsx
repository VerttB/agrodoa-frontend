import { twMerge } from "tailwind-merge";
import { ComponenteInterativo } from "@/core/interfaces/ComponenteInterativo";
import { X } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";

export const SidebarRoot = ({
  open,
  onOpenChange,
  children,
}: ComponenteInterativo) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const sidebarClass = twMerge(
    "fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transition-transform duration-600 rounded-b-xl rounded-t-xl",
    open ? "translate-x-0" : "-translate-x-full",
  );

  useEffect(() => {
    const escEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      console.log("clicado com esc");
    };

    const clickOutsideEvent = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node))
        console.log("ops");
    };

    if (open) {
      window.addEventListener("click", clickOutsideEvent);
      window.addEventListener("keydown", escEvent);
    }
    return () => {
      window.removeEventListener("keydown", escEvent);
      window.removeEventListener("click", clickOutsideEvent);
    };
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black/60 transition-transform">
      <aside ref={sidebarRef} className={sidebarClass}>
        <div className="flex justify-end p-2">
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Fechar sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[calc(100%-3rem)] overflow-y-auto p-4">
          {children}
        </div>
      </aside>
    </div>
  );
};
