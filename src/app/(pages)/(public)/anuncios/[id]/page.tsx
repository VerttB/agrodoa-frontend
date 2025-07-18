"use client";
import { useParams } from "next/navigation";
import { User, CalendarDays, MapPinCheck, Banknote, Loader2 } from "lucide-react";
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
import { iniciarNegociacao } from "@/core/services/Negociacao";
import { useUserContext } from "@/providers/UserProvider";
import { Alert } from "@/components/ui/alert";
import { useAlert } from "@/hooks/useAlert";

export default function AnuncioUnico() {
  const { id } = useParams();
  const { data: anuncio, loading } = useAnuncio<Anuncio>(String(id));
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [error,setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sucess, setSucess] = useState("")
  const { user } = useUserContext();
  const { show, message, type, showAlert, hideAlert } = useAlert();

  if (loading) return <LoadingSpin />;

  if (!anuncio)
    return <p className="mt-10 min-h-screen text-center text-xl">Anuncio não encontrado.</p>;

  const handleNegociar = async () => {
    if(amount <=0){
      setSucess("");
      setError("Você deve selecionar uma quantidade para negociar!!!")
    }
    else{
      try{
        setIsLoading(true);
        const res = await iniciarNegociacao(String(id),amount);
        setError("")
        setSucess("Negociação iniciada com sucesso");
        showAlert(" Negociação Iniciada com Sucesso", "success")
      }catch(e){
        setError("Erro ao realizar negociação")
        showAlert(" Erro ao realizar negociação", "error")

      }finally{
        setIsLoading(false);
      }
    }
  }

  const handleSalvar = async () => {

  }
  return (
    <>
    <Alert message={message} type={type} show={show} onClose={hideAlert} />

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
          </ItemPage.description>
        </ItemPage.content>
        <ItemPage.content>
          <ItemPage.actions>
            {error && <span className="text-red-500">{error}</span>}
            {sucess && <span className="text-green-500">{sucess}</span>}
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
              onClick={() => handleNegociar()}

            >
             {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Negociando..." : "Negociar"}
            </Button>
          </ItemPage.actions>

          <ItemPage.description title="Descrição">
            <p className="px-6 text-justify leading-relaxed">
              {anuncio.descricao}
            </p>
          </ItemPage.description>
        </ItemPage.content>
      </ItemPage.root>
    </div>
    </>
  );
}
