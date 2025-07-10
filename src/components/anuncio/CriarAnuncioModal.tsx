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

const createAdSchema = z.object({
  titulo: z.string().min(3, "Título muito curto").max(100),
  nome: z.string().min(3, "Nome do produto muito curto").max(100),
  quantidade: z.coerce.number()
    .int().gte(1, "Quantidade mínima 1").lte(10000, "Quantidade máxima 10000"),
  preco_unidade: z.coerce.number()
    .gte(0.05, "Preço mínimo R$0,05"),

  data_validade: z.string().refine((val) => {
    const date = new Date(val);
    return date > new Date();
  }, {
    message: "A data de validade deve ser futura",
  }),

  data_expiracao: z.string().refine((val) => {
    const date = new Date(val);
    return date > new Date();
  }, {
    message: "A data de expiração deve ser futura",
  }),

  entrega_pelo_fornecedor: z.enum(["true", "false"], {
    required_error: "Informe se o fornecedor entrega",
  }),

  cidade: z.string().min(1, "Informe a cidade"),

  image: z.instanceof(File, { message: "Deve ser uma imagem" })
    .refine(file => file?.size <= MAX_FILE_SIZE, "Máximo 5MB")
    .refine(file => ACCEPTED_IMAGE_TYPE.includes(file?.type), "Extensão inválida"),
});

type CreateAdData = z.infer<typeof createAdSchema>;

export const CriarAnuncio = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateAdData>({
    resolver: zodResolver(createAdSchema),
  });

  const onSubmit = (data: CreateAdData) => {
    console.log("Dados prontos para envio:", data);
    // você faz o fetch depois
  };

  return (
    <>
      <Button className="w-32" variant="outlined" onClick={() => setOpen(true)}>
        Criar
      </Button>
      <Modal.Root onOpenChange={() => setOpen(false)} open={open}>
        <Modal.Header title="Criar Anúncio" onClose={() => setOpen(false)} />
        <Modal.Content className="min-w-[640px]">
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Título do Anúncio"
              placeholder="Ex: Oferta de Tomate"
              className="w-full bg-white"
              {...register("titulo")}
              errors={errors.titulo?.message}
            />
            <Input
              label="Nome do Produto"
              placeholder="Ex: Tomate"
              className="w-full bg-white"
              {...register("nome")}
              errors={errors.nome?.message}
            />
            <Input
              label="Quantidade"
              type="number"
              className="w-full bg-white"
              {...register("quantidade")}
              errors={errors.quantidade?.message}
            />
            <Input
              label="Preço por Unidade"
              type="number"
              className="w-full bg-white"
              {...register("preco_unidade")}
              errors={errors.preco_unidade?.message}
            />
            <Input
              label="Data de Validade"
              type="date"
              className="w-full bg-white"
              {...register("data_validade")}
              errors={errors.data_validade?.message}
            />
            <Input
              label="Data de Expiração"
              type="date"
              className="w-full bg-white"
              {...register("data_expiracao")}
              errors={errors.data_expiracao?.message}
            />
            <div>
              <label className="text-sm font-medium">Entrega pelo Fornecedor</label>
              <select
                className="w-full bg-white border border-gray-300 rounded p-2 mt-1"
                {...register("entrega_pelo_fornecedor")}
              >
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
              {errors.entrega_pelo_fornecedor && (
                <p className="text-red-500 text-sm">{errors.entrega_pelo_fornecedor.message}</p>
              )}
            </div>
            <Input
              label="Cidade"
              placeholder="Ex: Salvador"
              className="w-full bg-white"
              {...register("cidade")}
              errors={errors.cidade?.message}
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
