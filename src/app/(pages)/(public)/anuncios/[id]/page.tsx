"use client";
import { useParams } from "next/navigation";
import { User, CalendarDays, MapPinCheck, Banknote } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemPage } from "@/components/ui/ItemPage";
import { useRouter } from "next/navigation";
import { useAnuncio } from "@/hooks/useAnuncio";
import { Anuncio } from "@/core/interfaces/Anuncio";
import { LoadingSpin } from "@/components/ui/loadingComponent";

export default function AnuncioUnico() {
  const { id } = useParams();
  console.log(id);
  const { data: anuncio, loading } = useAnuncio<Anuncio>(String(id));
  const router = useRouter();

  if (loading) return <LoadingSpin />;

  if (!anuncio)
    return <p className="mt-10 text-center text-xl">Anuncio não encontrado.</p>;

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
          <ItemPage.description title={anuncio.titulo}>
            <p className="flex items-center gap-2 text-xl">
              <User aria-hidden="true" /> Responsável: {anuncio.anunciante.nome}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Prazo: {anuncio.dataExpiracao}
            </p>
            <p  className="flex items-center gap-2 text-xl">
              <MapPinCheck/>
              Local:{`${anuncio.local.cidade} - ${anuncio.local.estado}`}
            </p>
            {anuncio.tipo === "VENDA" && <p className="flex items-center gap-2 text-xl">
              <Banknote/>
              Preço por Unidade: {anuncio.produto.precoUnidade.toLocaleString("pt-BR", { style: "currency", currency:"BRL"})}
            </p>}
          </ItemPage.description>
        </ItemPage.content>
        <ItemPage.content>
          <ItemPage.actions>
            <Input
              type="number"
              className="border-accent w-full rounded-3xl border-2 px-4 py-2"
              placeholder="Digite um valor"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <Button
              className="w-full py-2 text-3xl"
              onClick={() =>
                router.push(`/pagamento?id=${anuncio.idAnuncio}&amount=${anuncio.produto.quantidade}&type=anuncio`)
              }
            >
              Apoiar Causa
            </Button>
          </ItemPage.actions>

          <ItemPage.description title="Descrição">
            <p className="px-6 text-justify leading-relaxed">
              {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quam,
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
