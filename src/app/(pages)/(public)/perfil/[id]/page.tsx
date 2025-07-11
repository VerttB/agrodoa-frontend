import { UserAvaliacao } from "@/components/usuario/userAvaliacao";
import { Anuncio } from "@/core/interfaces/Anuncio";
import { Usuario } from "@/core/interfaces/Usuario";
import { getAnunciosUsuario } from "@/core/services/AnuncioService";
import { verOutroPerfil } from "@/core/services/UserService";
import { AnuncioList } from "@/components/anuncio/AnuncioList";
import { capitalize } from "@/core/utils/capitalize";
import { DenunciarUsuario } from "@/components/usuario/denunciarUsuario";

export default async function Perfil({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params;
  
  const avaliacoes = Array(4).fill(0);
  const usuario:Usuario = await verOutroPerfil(String(id))
  let anuncios: Anuncio[] = [];
  if(usuario.tipoUsuario !== "beneficiário") anuncios = await getAnunciosUsuario(String(id))
  return (
    <div className="min-h-screen bg-[#fefae0] text-black px-4 py-6 flex flex-col items-center border-x-2 border-[#6c757d]">
     
      <div className="flex flex-col items-center gap-1 mb-6">
        <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white text-4xl">
          <span>👤</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <h2 className="text-xl font-semibold">{usuario.nome}</h2>
          <span className="text-orange-500 font-bold h-[28px]"><DenunciarUsuario nomeUsuario={usuario.nome}/></span>
        </div>
        <p className="text-sm">Negociações finalizadas</p>
        <p className="text-sm">{capitalize(usuario.tipoUsuario)}</p>

        <div className="flex items-center gap-1 text-xl">
          ★☆☆☆☆
        </div>
        <p className="text-sm">Avaliação média : 0</p>
      </div>

      {/* Anúncios Disponíveis */}
     {usuario.tipoUsuario !== "beneficiário" && <div className="w-full max-w-5xl mb-10">
        <h3 className="text-lg font-semibold border-b pb-1">Anúncios Disponíveis</h3>
        <div className=" overflow-x-auto gap-4 py-4">
         <AnuncioList className="flex flex-row " anuncios={anuncios}/>
        </div>
      </div>}

      {/* Avaliações */}
      <div className="w-full max-w-5xl">
        <h3 className="text-lg font-semibold border-b pb-1">Avaliações</h3>
        <div className="flex flex-col gap-4 py-4">
          {avaliacoes.map((_, i) => (
            <UserAvaliacao key={i}/>
          ))}
        </div>
      </div>
    </div>
  );
}
