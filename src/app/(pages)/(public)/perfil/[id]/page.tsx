"use client";

import { UserAvaliacao } from "@/components/usuario/userAvaliacao";
import { verOutroPerfil } from "@/core/services/UserService";
import { capitalize } from "@/core/utils/capitalize";
import { DenunciarUsuario } from "@/components/usuario/denunciarUsuario";
import { UserAnuncio } from "@/components/usuario/usuarioAnuncioCard";
import { UsuarioCompleto } from "@/core/interfaces/UsuarioCompleto";
import { AvaliarUsuario } from "@/components/usuario/avaliarUsuario";
import { StarRating } from "@/components/ui/StarRating";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpin } from "@/components/ui/loadingComponent";

export default function Perfil() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<UsuarioCompleto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState(0);

  async function carregarPerfil() {
    if (typeof id === "string") {
      try {
        const data = await verOutroPerfil(id);
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao carregar perfil do usuário:", error);
      }
    }
  }

  useEffect(() => {
    carregarPerfil().finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    const avaliacoes = usuario?.avaliacoes || [];
    const novaMedia =
      avaliacoes.length > 0
        ? avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length
        : 0;
    setMedia(novaMedia);
  }, [usuario]);

  if (isLoading) {
    return <LoadingSpin/>
  }

  if (!usuario) {
    return (
      <p className="text-center mt-10 text-red-600">Usuário não encontrado.</p>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center border-x-2 border-[#6c757d] bg-[#fefae0] px-4 py-6 text-black">
      <div className="mb-6 flex flex-col items-center gap-1">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black text-4xl text-white">
          <span>👤</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <h2 className="text-xl font-semibold">{usuario.nome}</h2>
          <span className="h-[28px] font-bold text-orange-500">
            <DenunciarUsuario nomeUsuario={usuario.nome} id={usuario.idUser} />
          </span>
        </div>
        <p className="text-sm">Negociações finalizadas</p>
        <p className="text-sm">{capitalize(usuario.tipoUsuario)}</p>

        <div className="flex flex-col items-center">
          <StarRating nota={media} className="h-5 w-5" />
          <p className="text-sm">Avaliação média: {media.toFixed(1)}</p>
        </div>

        <AvaliarUsuario usuario={usuario} onAvaliado={carregarPerfil} />
      </div>

      {usuario.anunciosPostados?.length > 0 && (
        <div className="flex w-full max-w-5xl flex-col gap-2">
          <h3 className="border-b pb-1 text-lg font-semibold">Anúncios Postados</h3>
          <div className="flex gap-2 overflow-x-auto">
            {usuario.anunciosPostados.map((anuncio: any) => (
              <UserAnuncio
                key={anuncio.idAnuncio}
                anuncio={anuncio}
                nomeAnunciante={usuario.nome}
              />
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl mt-6">
        <h3 className="border-b pb-1 text-lg font-semibold">Avaliações</h3>
        <div className="flex flex-col gap-4 py-4">
          {usuario.avaliacoes.length > 0 ? (
            usuario.avaliacoes.map((ava, i) => (
              <UserAvaliacao avaliacao={ava} key={i} />
            ))
          ) : (
            <p className="text-sm italic text-gray-600">Nenhuma avaliação ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
