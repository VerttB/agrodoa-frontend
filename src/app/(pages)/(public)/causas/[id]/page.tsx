"use client";
import { useParams } from "next/navigation";
import { User, CalendarDays } from "lucide-react";
import { useState } from "react";
import { ItemPage } from "@/components/ui/ItemPage";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/providers/UserProvider";
import { useCausa } from "@/hooks/useCausa";
import { Causas } from "@/core/interfaces/Causas";
import { voluntariar } from "@/core/services/CausaService";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "@/components/ui/alert";

export default function CausaUnica() {
  const { id } = useParams();
  const router = useRouter();
  const { data: causa } = useCausa<Causas>(String(id));
  const { user } = useUserContext();
  const { show, message, type, showAlert, hideAlert } = useAlert();
  
  const handleApoiarCausa = () => {

  }
 const handleVoluntariar = async () => {
  try {
    await voluntariar(String(id));
    showAlert("Agora você é voluntário nesta causa!", "success");
  } catch (err: any) {
    showAlert(err.message || "Erro ao se voluntariar.", "error");
  }
};

  if (!causa)
    return <p className="mt-10 text-center text-xl">Causa não encontrada.</p>;

  return (
    <>
    <Alert message={message} type={type} show={show} onClose={hideAlert} />
    <div className="bg-primary relative z-0 min-h-screen px-16">
      <ItemPage.root>
        <ItemPage.content>
          <Image
            className="w-full rounded-xl border border-black md:w-3/4"
            alt="Imagem da causa"
            src="/mato.jpg"
            width={512}
            height={320}
          />
          <ItemPage.description title={causa.nome}>
            <p className="flex items-center gap-2 text-xl">
              <User aria-hidden="true" /> Responsável: {causa.contaCriadora.nome}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Prazo:{causa.prazo.toString()}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Meta Voluntários:{causa.metaVoluntarios}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Voluntários Inscritos:{causa.voluntariosAtivos}
            </p>
             <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Data de Criação:{causa.dataCriacao.toString()}
            </p>
          </ItemPage.description>
        </ItemPage.content>
        <ItemPage.content>
          <ItemPage.actions>         
              <Button
              className="w-full py-2 text-3xl"
              onClick={() => handleVoluntariar()}
            >
            Voluntariar-se
            </Button>
          </ItemPage.actions>

          <ItemPage.description title="Descrição">
            <p className="px-6 text-justify leading-relaxed">
              {causa.descricao ??
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quam,
              culpa eum corrupti perspiciatis voluptatum, eius qui voluptatem quas nisi
              quia dolore repellendus. Tenetur rem culpa illum voluptatibus! Sapiente,
              aspernatur.`}
            </p>
          </ItemPage.description>
        </ItemPage.content>
      </ItemPage.root>
    </div>
    </>
  );
}
