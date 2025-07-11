"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";
import { useState } from "react";

const avaliacaoSchema = z.object({
  nota: z.number().min(1, "Escolha uma nota de 1 a 5"),
  comentario: z.string().min(1, "Comentário obrigatório"),
});

type AvaliacaoData = z.infer<typeof avaliacaoSchema>;

export const AvaliarUsuario = ({ nomeUsuario }: { nomeUsuario: string }) => {
  const [ open,setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AvaliacaoData>({
    resolver: zodResolver(avaliacaoSchema),
  });

  const onSubmit = (data: AvaliacaoData) => {
    console.log("Enviando avaliação:", data);
    // await api.post("/avaliacoes", data)
  };

  return (
    <>
    <Button className="w-32" variant="outlined" onClick={() => setOpen(true)}>
        Criar
      </Button>
    <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Header title={`Avaliando ${nomeUsuario}`}/>
        <Modal.Content>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-orange-50 rounded-md p-6 mx-auto border border-teal-400 shadow-md"
        >
   
        <div className="flex justify-center gap-1 text-2xl mb-4">
            {[1, 2, 3, 4, 5].map((n) => (
            <span
                key={n}
                className="cursor-pointer"
                onClick={() => setValue("nota", n)}
            >
                ★
            </span>
            ))}
        </div>
        {errors.nota && (
            <p className="text-red-600 text-sm text-center">{errors.nota.message}</p>
        )}

        <textarea
            {...register("comentario")}
            placeholder="Deixe um comentário..."
            className="w-full p-2 border rounded-md border-green-400 min-h-[100px]"
        />
        {errors.comentario && (
            <p className="text-red-600 text-sm">{errors.comentario.message}</p>
        )}
        <Modal.Actions>
        <Button
            type="submit"
            className="mt-4 w-full bg-orange-400 text-white font-semibold py-2 rounded-md shadow-md hover:bg-orange-500 transition"
        >
            Avaliar
        </Button>
        <Button
              className="px-4 py-1"
              variant="outlined"
              onClick={() => setOpen(false)}>
                Cancelar
                      </Button>
        </Modal.Actions>
        </form>
        </Modal.Content>
    </Modal.Root>
    </>
  );
}
