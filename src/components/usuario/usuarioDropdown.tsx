"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Usuario } from "@/core/interfaces/Usuario";

export const UsuarioDropdown = ({usuario} : { usuario: Usuario }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full shadow-none"
            aria-label="Open edit menu"
            
          >
            <EllipsisVertical size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem>{`Olá, ${usuario.nome}`}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Cancelar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

        
    </>
  );
};
