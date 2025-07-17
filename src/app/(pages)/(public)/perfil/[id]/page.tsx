import { UserAvaliacao } from "@/components/usuario/userAvaliacao";
import { verOutroPerfil } from "@/core/services/UserService";
import { capitalize } from "@/core/utils/capitalize";
import { DenunciarUsuario } from "@/components/usuario/denunciarUsuario";
import { UserAnuncio } from "@/components/usuario/usuarioAnuncioCard";
import { UsuarioCompleto } from "@/core/interfaces/UsuarioCompleto";
import { AvaliarUsuario } from "@/components/usuario/avaliarUsuario";
import { StarRating } from "@/components/ui/StarRating";

export default async function Perfil({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;

  
  const usuario: UsuarioCompleto = await verOutroPerfil(String(id));
  const avaliacoes = usuario.avaliacoes
  
  const media =  avaliacoes.length > 0
    ? avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length
    : 0;

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
        <AvaliarUsuario nomeUsuario={usuario.nome} idUsuario={usuario.idUser}/>
      </div>
      {usuario.anunciosPostados && <div className="flex flex-col w-full max-w-5xl gap-2 overflow-x-auto overflow-y-hidden">
          <h3 className="border-b pb-1 text-lg font-semibold">Anúncios Postados</h3>
      <div className="flex w-full max-w-5xl gap-2 overflow-x-auto overflow-y-hidden">
        {usuario.anunciosPostados.map((anuncio: any) => (
          <UserAnuncio
            key={anuncio.idAnuncio}
            anuncio={anuncio}
            nomeAnunciante={usuario.nome}
          />
        ))}
        </div>
      </div> }
      <div className="w-full max-w-5xl">
        <h3 className="border-b pb-1 text-lg font-semibold">Avaliações</h3>
        <div className="flex flex-col gap-4 py-4">
          {usuario.avaliacoes.map((ava, i) => (
            <UserAvaliacao avaliacao={ava} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
