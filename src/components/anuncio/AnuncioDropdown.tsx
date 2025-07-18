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
import { Anuncio } from "@/core/interfaces/Anuncio/Anuncio";
import { useState } from "react";
import { EditarAnuncio } from "./EditarAnuncioModal";
import { VerNegociantes } from "../fornecedor/VerNegociantes";

export const AnuncioDropdownMenu = ({ anuncio }: { anuncio: Anuncio }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNegociantes, setOpenNegociantes] = useState(false);
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
          <DropdownMenuItem onClick={() => setOpenNegociantes(true)}>
            Ver Negociantes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Cancelar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CancelarAnuncioModal
        id={anuncio.idAnuncio}
        titulo={anuncio.titulo}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />

      <EditarAnuncio
        anuncio={anuncio}
        open={openEdit}
        onOpenChange={setOpenEdit}

      />

      <VerNegociantes
        anuncioId={anuncio.idAnuncio}
        open={openNegociantes}
        onOpenChange={setOpenNegociantes}
      />
    </>
  );
};
