import { UserAvaliacao } from "@/components/usuario/userAvaliacao";
import { verOutroPerfil } from "@/core/services/UserService";
import { capitalize } from "@/core/utils/capitalize";
import { DenunciarUsuario } from "@/components/usuario/denunciarUsuario";
import { UserAnuncio } from "@/components/usuario/usuarioAnuncioCard";


export default async function Perfil({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params;
  
  const avaliacoes = Array(4).fill(0);
  const usuario = await verOutroPerfil(String(id))
  console.log(usuario)
 
 // if(usuario.tipoUsuario !== "beneficiario") anuncios = await getAnunciosUsuario(String(id))
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
    <div className="w-full  max-w-5xl overflow-x-auto overflow-y-hidden flex gap-2">
       {usuario.anunciosPostados?.map((anuncio:any) => (
        <UserAnuncio key={anuncio.idAnuncio} anuncio={anuncio} nomeAnunciante={usuario.nome}/>
      ))}
  </div>
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
