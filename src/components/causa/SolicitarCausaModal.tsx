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
export const SolicitarCausa = () => {
  const [open, setOpen] = useState(false);

  const solicitarCausaSchema = z.object({
    name: z.string({
      required_error: "O campo de nome de causa não deve estar vazio",
    }),
    goal: z.union( [
        z.string().transform( x => x.replace( /[^0-9.-]+/g, '' ) ),
        z.number(),
    ] ).pipe( z.coerce.number().min( 0.0001 ).max( 999999999 ) ),
    owner: z.string({
        required_error: "O responsável não deve estar vazio" 
    }),
    duration: z.string({

    }),
    image: z
      .instanceof(File, {
        message: "Deve ser uma imagem",
      })

      .refine(
        (file) => file?.size <= MAX_FILE_SIZE,
        `Tamanho máximo de imagem 5MB.`,
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
        "Apenas .jpg, .jpeg, .png and .webp são aceitos.",
      ),
  });

  type solicitarCausaData = z.infer<typeof solicitarCausaSchema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<solicitarCausaData>({
    resolver: zodResolver(solicitarCausaSchema),
  });

  const onSubmit = (data: solicitarCausaData) => {
    console.log("Enviando....");
    console.log(data);
  };
  return (
    <>
      <Button className="w-32" variant="outlined" onClick={() => setOpen(true)}>
        Criar
      </Button>
      <Modal.Root onOpenChange={() => setOpen(false)} open={open}>
        <Modal.Header title="Solicitar Anúncio" onClose={() => setOpen(false)} />
        <Modal.Content className="min-w-[640px]">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome do Anúncio"
              placeholder="Insira o nome do seu anúncio"
              className="w-full bg-white"
              {...register("name")}
              errors={errors.name?.message}
            />
            <Input
              label="Nome do Produto"
              placeholder="Insira o nome do produto"
              className="w-full bg-white"
              {...register("owner")}
              errors={errors.owner?.message}
            />
            <Input
              label="Quantidade"
              placeholder="Insira a quantidade do produto "
              className="w-full bg-white"
              {...register("goal")}
              errors={errors.goal?.message}
            />
            <Input
              label="Preço da Unidade"
              placeholder="Insira o preço da unidade do produto"
              className="w-full bg-white"
              {...register("duration")}
              errors={errors.duration?.message}
            />
            <Controller
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <ImageUploadInput
                      label="Imagem do Produto"
                      value={field.value}
                      onChange={field.onChange}
                      errors={errors.image?.message}
                    />
                  )}
                />
            <Modal.Actions>
              <Button className="px-4 py-1" type="submit">
                Criar
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
