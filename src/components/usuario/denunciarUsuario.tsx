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

export const DenunciarUsuario = ({ nomeUsuario }: { nomeUsuario: string }) => {
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
      <Button
        variant="ghost"
        className="h-fit w-fit p-0 shadow-none"
        onClick={() => setOpen(true)}
      >
        <TriangleAlert color="red" />
      </Button>
      <Modal.Root open={open} onOpenChange={setOpen}>
        <Modal.Header title={`Denunciando ${nomeUsuario}`} />
        <Modal.Content>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-md rounded-md border border-teal-500 bg-orange-50 p-6 shadow-md"
          >
            <h2 className="mb-4 text-center text-xl font-semibold">
              Denunciando {nomeUsuario}
            </h2>

            <div className="mb-4 flex flex-col gap-2">
              {motivosDisponiveis.map((motivo, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={motivo}
                    {...register("motivos")}
                    className="h-4 w-4"
                  />
                  {motivo}
                </label>
              ))}
              {errors.motivos && (
                <p className="text-sm text-red-600">{errors.motivos.message}</p>
              )}
            </div>

            <textarea
              {...register("descricao")}
              placeholder="Escreva uma descrição do motivo"
              className="min-h-[100px] w-full rounded-md border border-green-400 p-2"
            />
            {errors.descricao && (
              <p className="text-sm text-red-600">{errors.descricao.message}</p>
            )}
            <Modal.Actions>
              <Button
                type="submit"
                className="mt-4 w-full rounded-md bg-orange-400 py-2 font-semibold text-white shadow-md transition hover:bg-orange-500"
              >
                Denunciar
              </Button>
              <Button
                className="px-4 py-1"
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Fechar
              </Button>
            </Modal.Actions>
          </form>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
