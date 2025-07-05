"use client";

import { ComponenteInterativo } from "@/core/interfaces/ComponenteInterativo";
import { useEffect } from "react";
import { createPortal } from "react-dom";


export const ModalRoot = ({ open, onOpenChange, children }: ComponenteInterativo) => {
  useEffect(() => {
    const escEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    if (open) {
      window.addEventListener("keydown", escEvent);
    }
    return () => {
      window.removeEventListener("keydown", escEvent);
    };
  }, [open, onOpenChange]);

  if (!open) return null;
  return createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black/60">
      <div className="bg-neutral fixed top-1/2 left-1/2 z-10 -translate-1/2 rounded-2xl transition">
        {children}
      </div>
    </div>,
    document.body,
  );
};
