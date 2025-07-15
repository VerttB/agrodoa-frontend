"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";
import { denunciar } from "@/core/services/UserService";
const motivosDisponiveis = [
  "Desrespeito",
  "Propaganda enganosa",
  "Não recebimento do produto",
];

const denunciaSchema = z.object({
  nomeMotivo: z
    .string(),
});

type DenunciaData = z.infer<typeof denunciaSchema>;

export const DenunciarUsuario = ({ nomeUsuario,id }: { nomeUsuario: string, id:string }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DenunciaData>({
    resolver: zodResolver(denunciaSchema),
  });

  const onSubmit = async (data: DenunciaData) => {
    console.log("Enviando denúncia:", data);
    try{
      const res = await denunciar(data,id)
      console.log(await res)
      setOpen(false)
    }catch(e){
      console.log(e)
    }
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  }

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
        <Modal.Content className="xl:min-w-[480px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-md rounded-md bg-orange-50 p-4 shadow-md"
          >
            <h2 className="mb-4 text-center text-xl font-semibold">
              Selecione uma das opções abaixo
            </h2>

            <div className="mb-4 flex flex-col gap-2 text-xl">
              {motivosDisponiveis.map((motivo, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    id="motivo"
                    type="radio"
                    value={motivo}
                    {...register("nomeMotivo")}
                    className="h-4 w-4"
                  />
                  {motivo}
                </label>
              ))}
              {errors.nomeMotivo && (
                <p className="text-sm text-red-600">{errors.nomeMotivo.message}</p>
              )}
            </div>

            <Modal.Actions>
              <Button
                type="submit"
                className="flex-1"
              >
                Denunciar
              </Button>
              <Button
                className="flex-1"
                variant="outlined"
                onClick={() => handleClose()}>
                Cancelar
              </Button>
            </Modal.Actions>
          </form>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
