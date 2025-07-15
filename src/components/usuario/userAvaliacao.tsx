import { Avaliacao } from "@/core/interfaces/Avaliacao";
import { StarRating } from "../ui/StarRating"; // ajuste o path conforme necessário

export const UserAvaliacao = ({ avaliacao }: { avaliacao: Avaliacao }) => {
  return (
    <div className="rounded bg-neutral px-4 py-2 shadow-lg">
      <div className="mb-1 flex items-center gap-2">
        <div className="text-xl">👤</div>
        <div className="flex flex-col">
          <p className="text-xl font-medium">{avaliacao.nomeAvaliador}</p>
          <StarRating nota={avaliacao.nota} />
        </div>
      </div>
      <p className="text-lg">{avaliacao.comentario}</p>
    </div>
  );
};
