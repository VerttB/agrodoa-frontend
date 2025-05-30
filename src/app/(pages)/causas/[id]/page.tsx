"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { User, CalendarDays } from "lucide-react";
import { causas } from "@/constants/Causas";
import Button from "@/components/button";
import { useState } from "react";

export default function CausaUnica() {
  const { id } = useParams();
  const causa = causas.find((c) => c.id === id);
  const [donationValue, setDonationValue] = useState(0);

  if (!causa)
    return <p className="mt-10 text-center text-xl">Causa não encontrada.</p>;

  return (
    <div className="bg-primary relative z-0 min-h-screen pb-32">
      {/* Metade de cima */}
      <div className="flex flex-col gap-4 p-4 md:flex-row">
        <Image
          className="w-full rounded-xl border border-black md:w-3/4"
          alt="Imagem da causa"
          src="/mato.jpg"
          width={512}
          height={320}
        />
        <div className="bg-neutral w-full rounded-xl px-4 py-4">
          <h2 className="bg-secondary-darker text-neutral mb-4 rounded-xl px-4 py-3 text-3xl">
            {causa.nome}
          </h2>

          <div className="flex flex-col gap-4">
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
          </div>
        </div>
      </div>

      {/* Parte de baixo */}
      <div className="flex flex-col gap-8 px-4 md:flex-row">
        <div className="flex w-full flex-col gap-4 p-4 md:w-3/4">
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

          <input
            type="number"
            className="border-accent w-full rounded-3xl border-2 px-4 py-2"
            placeholder="Digite um valor"
            onChange={(e) => setDonationValue(Number(e.target.value))}
            value={donationValue}
            min={1}
          />

          <Button
            className="w-full py-2 text-3xl"
            onClick={() => console.log("Doar", donationValue)}
          >
            Apoiar Causa
          </Button>
        </div>
        <div className="bg-neutral w-full rounded-3xl px-2 py-6">
          <h2 className="bg-secondary-darker text-neutral mb-4 rounded-xl px-4 py-2 text-3xl">
            Descrição
          </h2>
          <p className="text-justify leading-relaxed">
            {causa.descricao ??
              `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quam,
              culpa eum corrupti perspiciatis voluptatum, eius qui voluptatem quas nisi
              quia dolore repellendus. Tenetur rem culpa illum voluptatibus! Sapiente,
              aspernatur.`}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 w-full">
        <Image
          src="/WaveUnica.svg"
          alt="Waves Design"
          width={1920}
          height={256}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
