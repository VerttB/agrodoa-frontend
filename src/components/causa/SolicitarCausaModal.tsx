"use client";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { z } from "zod";
import { Input } from "../ui/input";
import { ACCEPTED_IMAGE_TYPE, MAX_FILE_SIZE } from "@/core/constants/values";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUploadInput } from "../ui/imageInput";

const solicitarCausaSchema = z.object({
  nome: z.string({
    required_error: "O campo de nome de causa não deve estar vazio",
  }).min(3, "Nome muito curto"),

  meta: z.coerce.number()
    .min(0.01, "Meta deve ser maior que zero"),

  responsavel: z.string({
    required_error: "O responsável não deve estar vazio",
  }).min(3, "Nome do responsável muito curto"),

  prazo: z.string({
    required_error: "Informe a data limite",
  }).refine(dateStr => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && date > new Date();
  }, {
    message: "A data deve ser válida e futura",
  }),

  image: z.instanceof(File, {
    message: "Deve ser uma imagem",
  })
  .refine(file => file?.size <= MAX_FILE_SIZE, "Tamanho máximo de imagem 5MB.")
  .refine(file => ACCEPTED_IMAGE_TYPE.includes(file?.type), "Apenas .jpg, .jpeg, .png e .webp são aceitos."),
});

type SolicitarCausaData = z.infer<typeof solicitarCausaSchema>;

export const SolicitarCausa = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SolicitarCausaData>({
    resolver: zodResolver(solicitarCausaSchema),
  });

  const onSubmit = (data: SolicitarCausaData) => {
    console.log("Enviando...");
    console.log(data);
  };

  return (
    <>
      <Button className="w-32" variant="outlined" onClick={() => setOpen(true)}>
        Criar
      </Button>
      <Modal.Root onOpenChange={() => setOpen(false)} open={open}>
        <Modal.Header title="Solicitar Causa" onClose={() => setOpen(false)} />
        <Modal.Content className="min-w-[640px]">
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome da Causa"
              placeholder="Insira o nome da causa"
              className="w-full bg-white"
              {...register("nome")}
              errors={errors.nome?.message}
            />
            <Input
              label="Responsável"
              placeholder="Nome do responsável"
              className="w-full bg-white"
              {...register("responsavel")}
              errors={errors.responsavel?.message}
            />
            <Input
              label="Meta (valor a arrecadar)"
              placeholder="Insira a meta financeira"
              type="number"
              step="0.01"
              className="w-full bg-white"
              {...register("meta")}
              errors={errors.meta?.message}
            />
            <Input
              label="Prazo (data limite)"
              type="date"
              className="w-full bg-white"
              {...register("prazo")}
              errors={errors.prazo?.message}
            />
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageUploadInput
                  label="Imagem da Causa"
                  value={field.value}
                  onChange={field.onChange}
                  errors={errors.image?.message}
                />
              )}
            />
            <Modal.Actions>
              <Button className="px-4 py-1" type="submit">
                Solicitar
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
