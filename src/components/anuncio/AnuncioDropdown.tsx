"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { CancelarAnuncioModal } from "./CancelarAnuncioModal";
import { IAnuncio } from "@/core/interfaces/IAnuncio";
import { useState } from "react";

export const AnuncioDropdownMenu = ({ anuncio }: { anuncio: IAnuncio }) => {
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full shadow-none"
            aria-label="Open edit menu"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem>Ver Negociantes</DropdownMenuItem>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            B
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CancelarAnuncioModal
        id={anuncio.id}
        titulo={anuncio.titulo}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />
    </>
  );
};
