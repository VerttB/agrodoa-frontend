"use client";
import { useParams } from "next/navigation";
import { User, CalendarDays, MapPinCheck, Banknote } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemPage } from "@/components/ui/ItemPage";
import { useRouter } from "next/navigation";
import { useAnuncio } from "@/hooks/useAnuncio";
import { Anuncio } from "@/core/interfaces/Anuncio/Anuncio";
import { LoadingSpin } from "@/components/ui/loadingComponent";
import { useState } from "react";
import Link from "next/link";
import { imgValidate } from "@/core/utils/imageValidate";

export default function AnuncioUnico() {
  const { id } = useParams();
  const { data: anuncio, loading } = useAnuncio<Anuncio>(String(id));
  const router = useRouter();
  const [amount, setAmount] = useState(0);

  if (loading) return <LoadingSpin />;

  if (!anuncio)
    return <p className="mt-10 text-center text-xl">Anuncio não encontrado.</p>;

  return (
    <div className="bg-primary relative z-0 min-h-screen px-16">
      <ItemPage.root>
        <ItemPage.content>
          <div className="w-full md:w-3/4 flex justify-center">
          <Image
            className="w-full rounded-xl border border-black md:w-3/4"
            alt="Imagem da causa"
            src={imgValidate(anuncio.nomeArquivoFoto)}
            width={256}
            height={52}
          />
          </div>
          <ItemPage.description title={anuncio.titulo}>
            <Link href={`/perfil/${anuncio.anunciante.idAnunciante}`} className="flex items-center gap-2 text-xl underline text-gray-900">
              <User aria-hidden="true" /> Responsável: {anuncio.anunciante.nome}
            </Link>
            <p className="flex items-center gap-2 text-xl">
              <CalendarDays aria-hidden="true" /> Prazo: {anuncio.dataExpiracao}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <MapPinCheck />
              Local:{`${anuncio.local.cidade} - ${anuncio.local.estado}`}
            </p>
            {anuncio.tipo === "VENDA" && (
              <p className="flex items-center gap-2 text-xl">
                <Banknote />
                Preço por Unidade:{" "}
                {anuncio.produto.precoUnidade.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            )}
          </ItemPage.description>
        </ItemPage.content>
        <ItemPage.content>
          <ItemPage.actions>
            <Input
              label="Quantidade"
              type="number"
              className="border-accent w-full rounded-3xl border-2 px-4 py-2"
              placeholder="Diga a quantidade que deseja comprar"
              onChange={(e) => {
                setAmount((_) => Number(e.target.value));
              }}
            />
            <Button
              className="w-full py-2 text-3xl"
              onClick={() =>
                router.push(
                  `/pagamento?id=${anuncio.idAnuncio}&amount=${amount}&type=anuncio`,
                )
              }
            >
              Negociar
            </Button>
            <Button className="w-full py-2 text-3xl" variant="outlined">
              Salvar
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
