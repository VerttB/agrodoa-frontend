"use client";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { z } from "zod";
import { Input } from "../ui/input";
import { ACCEPTED_IMAGE_TYPE, MAX_FILE_SIZE } from "@/core/constants/values";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUploadInput } from "../ui/imageInput";
import { Anuncio } from "@/core/interfaces/Anuncio";

interface EditarAnuncioProps {
  anuncio: Anuncio;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const EditarAnuncio = ({
  open,
  onOpenChange,
  anuncio,
}: EditarAnuncioProps) => {
  const editAdSchema = z.object({
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

  type editAdData = z.infer<typeof editAdSchema>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<editAdData>({
    resolver: zodResolver(editAdSchema),
  });

  const onSubmit = (data: editAdData) => {
    console.log("Enviando....");
    console.log(data);
  };
  return (
    <Modal.Root onOpenChange={onOpenChange} open={open}>
      <Modal.Header title="Criar Anúncio" onClose={() => onOpenChange(false)} />
      <Modal.Content className="min-w-[640px]">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome do Anúncio"
            placeholder="Insira o nome do seu anúncio"
            className="w-full bg-white"
            value={anuncio.titulo}
            {...register("name")}
            errors={errors.name?.message}
          />
          <Input
            label="Nome do Produto"
            value={anuncio.produto.nome}
            placeholder="Insira o nome do produto"
            className="w-full bg-white"
            {...register("productName")}
            errors={errors.productName?.message}
          />
          <Input
            label="Quantidade"
            value={anuncio.produto.quantidade}
            placeholder="Insira a quantidade do produto "
            className="w-full bg-white"
            {...register("amount")}
            errors={errors.amount?.message}
          />
          <Input
            label="Preço da Unidade"
            value={anuncio.produto.quantidade}
            placeholder="Insira o preço da unidade do produto"
            className="w-full bg-white"
            {...register("price")}
            errors={errors.price?.message}
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
          <Modal.Actions className="justify-end">
            <Button className="px-8 py-2" type="submit">
              Salvar
            </Button>
            <Button
              className="px-8 py-2"
              variant="outlined"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
          </Modal.Actions>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
};
