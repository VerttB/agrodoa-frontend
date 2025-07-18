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

export default function CausaUnica() {
  const { id } = useParams();
  const router = useRouter();
  const { data: causa } = useCausa<Causas>(String(id));
  const [donationValue, setDonationValue] = useState(0);
  const { user } = useUserContext();

  if (!causa)
    return <p className="mt-10 text-center text-xl">Causa não encontrada.</p>;

  return (
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
              <User aria-hidden="true" /> Responsável: Vazio
            </p>
            <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Prazo:{" "}
              {causa.prazo.toString()}
            </p>
          </ItemPage.description>
        </ItemPage.content>
        <ItemPage.content>
          <ItemPage.actions>
            <Button
              className="w-full py-2 text-3xl">
              Apoiar
            </Button>
            <Button
              className="w-full py-2 text-3xl"
        
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
  );
}
