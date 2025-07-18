"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { avaliar } from "@/core/services/UserService";
import { UsuarioCompleto } from "@/core/interfaces/UsuarioCompleto";

const avaliacaoSchema = z.object({
  nota: z.number().min(1, "Escolha uma nota de 1 a 5"),
  comentario: z.string().min(1, "Comentário obrigatório"),
});

type AvaliacaoData = z.infer<typeof avaliacaoSchema>;

interface AvaliarUsuarioProps {
  usuario: UsuarioCompleto;
  onAvaliado?: () => void; 
}

export const AvaliarUsuario = ({ usuario, onAvaliado }: AvaliarUsuarioProps) => {
  const [open, setOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AvaliacaoData>({
    resolver: zodResolver(avaliacaoSchema),
  });

  const notaSelecionada = watch("nota");

  const handleSetNota = (n: number) => {
    setValue("nota", n);
  };

  const onSubmit = async (data: AvaliacaoData) => {
    try {
      await avaliar(data, usuario.idUser);
      onAvaliado?.(); 
      reset();
      setOpen(false);
    } catch (e) {
      console.error("Erro ao enviar avaliação:", e);
    }
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" className="w-32" onClick={() => setOpen(true)}>
        Avaliar
      </Button>

      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Header title={`Avaliando ${usuario.nome}`} />
        <Modal.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto xl:min-w-[480px] w-full max-w-md rounded-md p-6 shadow-md space-y-4"
          >
            <div className="flex justify-center gap-2 my-4 text-3xl">
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = hoveredStar ? n <= hoveredStar : n <= notaSelecionada;
                return (
                  <Button
                    key={n}
                    type="button"
                    variant="ghost"
                    onMouseEnter={() => setHoveredStar(n)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onClick={() => handleSetNota(n)}
                    className="p-0"
                  >
                    <Star
                      className={
                        filled ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                      }
                    />
                  </Button>
                );
              })}
            </div>
            {errors.nota && (
              <p className="text-center text-sm text-red-600">{errors.nota.message}</p>
            )}

            <textarea
              {...register("comentario")}
              placeholder="Deixe um comentário..."
              className="min-h-[100px] w-full rounded-md border border-green-400 p-2"
            />
            {errors.comentario && (
              <p className="text-sm text-red-600">{errors.comentario.message}</p>
            )}

            <Modal.Actions>
              <Button type="submit" className="flex-1">
                Enviar Avaliação
              </Button>
              <Button type="button" className="flex-1" variant="outlined" onClick={handleClose}>
                Cancelar
              </Button>
            </Modal.Actions>
          </form>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
