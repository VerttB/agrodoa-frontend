"use client";
import { useParams } from "next/navigation";
import { User, CalendarDays } from "lucide-react";
import { causas } from "@/core/constants/Causas";
import { useState } from "react";
import { ItemPage } from "@/components/ItemPage";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Button from "@/components/button";
import Input from "@/components/input";
import { useUserContext } from "@/providers/UserProvider";

export default function CausaUnica() {
  const { id } = useParams();
  const router = useRouter();
  const causa = causas.find((c) => c.id === id);
  const [donationValue, setDonationValue] = useState(0);
  const { user} = useUserContext();
  
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
              <User aria-hidden="true" /> Responsável: {causa.responsavelId}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Prazo:
            </p>

            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
                <div
                  className="bg-accent h-full rounded"
                  style={{ width: `${(causa.arrecadado / causa.meta) * 100}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xl">
                <p>Arrecadado: R$ {causa.arrecadado}</p>
                <p>Meta: R$ {causa.meta}</p>
              </div>
            </div>
          </ItemPage.description>
        </ItemPage.content>
        <ItemPage.content>
          <ItemPage.actions>
            <div className="flex flex-wrap justify-evenly gap-2">
              {[5, 10, 25, 50].map((v) => (
                <Button
                  key={v}
                  className="rounded-3xl px-6 py-2"
                  onClick={() => setDonationValue(v)}
                >
                  R$ {v},00
                </Button>
              ))}
            </div>

            <Input
              type="number"
              className="border-accent focus:border-accent w-full rounded-3xl border-2 px-4 py-2"
              placeholder="Digite um valor"
              onChange={(e) => setDonationValue(Number(e.target.value))}
              value={donationValue}
              min={1}
            />

            <Button
              className="w-full py-2 text-3xl"
              onClick={() => { 
                if(!user) router.push('/login')
                router.push(`/pagamento?id=${causa.id}&valor=${donationValue}&name=${causa.nome}
                   `)}}
            >
              Apoiar Causa
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
