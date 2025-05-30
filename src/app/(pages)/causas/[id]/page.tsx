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

  if (!causa) return <p className="text-xl text-center mt-10">Causa não encontrada.</p>;

  return (
    <div className="relative z-0 min-h-screen bg-primary pb-32">
      {/* Metade de cima */}
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <Image
          className="w-full md:w-3/4 rounded-xl border border-black"
          alt="Imagem da causa"
          src="/mato.jpg"
          width={512}
          height={320}
        />
        <div className="w-full rounded-xl bg-neutral px-4 py-4">
          <h2 className="bg-secondary-darker rounded-xl text-3xl text-neutral px-4 py-3 mb-4">
            {causa.nome}
          </h2>

          <div className="flex flex-col gap-4">
            <p className="flex items-center text-xl gap-2">
              <User aria-hidden="true" /> Responsável: {causa.responsavelId}
            </p>
            <p className="flex items-center text-xl gap-2">
              <CalendarDays aria-hidden="true" /> Prazo:
            </p>

            <div className="mt-4">
              <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                <div
                  className="bg-accent h-full rounded"
                  style={{ width: `${(causa.arrecadado / causa.meta) * 100}%` }}
                />
              </div>

              <div className="flex justify-between mt-2 text-xl">
                <p>Arrecadado: R$ {causa.arrecadado}</p>
                <p>Meta: R$ {causa.meta}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parte de baixo */}
      <div className="flex flex-col md:flex-row gap-8 px-4">
        <div className="w-full md:w-3/4 flex flex-col gap-4 p-4">
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
            className="w-full rounded-3xl px-4 py-2 border-2 border-accent"
            placeholder="Digite um valor"
            onChange={(e) => setDonationValue(Number(e.target.value))}
            value={donationValue}
            min={1}
          />

          <Button
            className="text-3xl w-full py-2"
            onClick={() => console.log("Doar", donationValue)}>
            Apoiar Causa
          </Button>
        </div>
        <div className="bg-neutral px-2 py-6 rounded-3xl w-full">
          <h2 className="text-3xl bg-secondary-darker text-neutral px-4 py-2 rounded-xl mb-4">
            Descrição
          </h2>
          <p className="leading-relaxed text-justify">
            {causa.descricao ??
              `Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quam,
              culpa eum corrupti perspiciatis voluptatum, eius qui voluptatem quas nisi
              quia dolore repellendus. Tenetur rem culpa illum voluptatibus! Sapiente,
              aspernatur.`}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full -z-10">
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
