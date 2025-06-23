"use client";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { z } from "zod";
import { Input } from "../ui/input";
import { ACCEPTED_IMAGE_TYPE, MAX_FILE_SIZE } from "@/core/constants/values";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export const CriarAnuncio = () => {
  const [open, setOpen] = useState(false);

  const createAdSchema = z.object({
    name: z.string({
      required_error: "O campo de nome de anúncio não deve estar vazio",
    }),
    productName: z.string({
      required_error: "O campo do nome do produto não deve estar vazio",
    }),
    amount: z.coerce
      .number({
        required_error: "O campo de quantidade não pode estar vazio",
        invalid_type_error: "O campo deve ser um número",
      })
      .int()
      .gte(1, {
        message: "A quantidade deve ser maior que 1",
      })
      .lte(10000, {
        message: "A quantidade deve ser menor que 10000",
      }),
    price: z.coerce
      .number({
        required_error: "O campo do preço não pode estar vazio",
        invalid_type_error: "O campo deve ser um número",
      })
      .gte(0.05, {
        message: "O preço deve ser maior que R$0,05",
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

  type createAdData = z.infer<typeof createAdSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createAdData>({
    resolver: zodResolver(createAdSchema),
  });

  const onSubmit = (data: createAdData) => {
    console.log("Enviando....");
    console.log(data);
  };
  return (
    <>
      <Button className="w-32" variant="outlined" onClick={() => setOpen(true)}>
        Criar
      </Button>
      <Modal.Root onOpenChange={() => setOpen(false)} open={open}>
        <Modal.Header title="Criar Anúncio" onClose={() => setOpen(false)} />
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
              {...register("productName")}
              errors={errors.productName?.message}
            />
            <Input
              label="Quantidade"
              placeholder="Insira a quantidade do produto "
              className="w-full bg-white"
              {...register("amount")}
              errors={errors.amount?.message}
            />
            <Input
              label="Preço da Unidade"
              placeholder="Insira o preço da unidade do produto"
              className="w-full bg-white"
              {...register("price")}
              errors={errors.price?.message}
            />
            <Input
              type="file"
              accept="image/*"
              className="h-32 w-full bg-white"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setValue("image", file as File, { shouldValidate: true });
              }}
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
