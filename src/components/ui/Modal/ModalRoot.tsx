'use client'

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalRootProps{
    open:boolean,
    onOpenChange:( open:boolean ) => void,
    children: React.ReactNode,
}


export const ModalRoot = ({open,onOpenChange, children}: ModalRootProps ) => {

    if(!open) return null;

    useEffect(() => {
        const escEvent = (e:KeyboardEvent) => {
            if(e.key === "Escape") onOpenChange(false)
        }

        if(open){
            window.addEventListener("keydown", escEvent);
        }
        return(() => {
            window.removeEventListener("keydown", escEvent);
        })
    }, [open, onOpenChange])

    return createPortal(
        
        <div className="fixed z-10 right-0 left-0 bottom-0 top-0 bg-black/60">
            <div className="bg-neutral rounded-2xl z-10  transition fixed top-1/2 left-1/2 -translate-1/2 ">
                {children}
            </div>
        </div>,
        document.body
    )
}