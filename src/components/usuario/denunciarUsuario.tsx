"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";
const motivosDisponiveis = [
  "Motivo1",
  "Motivo2",
  "Motivo3",
  "Motivo4",
  "Motivo5",
];

const denunciaSchema = z.object({
  motivos: z
    .array(z.string())
    .min(1, "Selecione pelo menos um motivo para denúncia"),
  descricao: z.string().min(1, "Descrição obrigatória"),
});

type DenunciaData = z.infer<typeof denunciaSchema>;

export const  DenunciarUsuario = ({ nomeUsuario }: { nomeUsuario: string }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DenunciaData>({
    resolver: zodResolver(denunciaSchema),
  });

  const onSubmit = (data: DenunciaData) => {
    console.log("Enviando denúncia:", data);
    // await api.post("/denuncias", data)
  };

  return (
    <>
    <Button variant="ghost" className="w-fit h-fit p-0 shadow-none" onClick={() => setOpen(true)}><TriangleAlert color="red"/></Button>
    <Modal.Root open={open} onOpenChange={setOpen}>
    <Modal.Header title={`Denunciando ${nomeUsuario}`}/>
    <Modal.Content>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full bg-orange-50 rounded-md p-6 mx-auto border border-teal-500 shadow-md"
    >
      <h2 className="text-xl font-semibold text-center mb-4">
        Denunciando {nomeUsuario}
      </h2>

      <div className="flex flex-col gap-2 mb-4">
        {motivosDisponiveis.map((motivo, index) => (
          <label key={index} className="flex gap-2 items-center">
            <input
              type="checkbox"
              value={motivo}
              {...register("motivos")}
              className="w-4 h-4"
            />
            {motivo}
          </label>
        ))}
        {errors.motivos && (
          <p className="text-red-600 text-sm">{errors.motivos.message}</p>
        )}
      </div>

      <textarea
        {...register("descricao")}
        placeholder="Escreva uma descrição do motivo"
        className="w-full p-2 border rounded-md border-green-400 min-h-[100px]"
      />
      {errors.descricao && (
        <p className="text-red-600 text-sm">{errors.descricao.message}</p>
      )}
        <Modal.Actions>
      <Button
        type="submit"
        className="mt-4 w-full bg-orange-400 text-white font-semibold py-2 rounded-md shadow-md hover:bg-orange-500 transition"
      >
        Denunciar
      </Button>
      <Button
            className="px-4 py-1"
            variant="outlined"
            onClick={() => setOpen(false)}>
            Fechar
              </Button>
      </Modal.Actions>
    </form>
    </Modal.Content>
    </Modal.Root>
    </>
  );
}
