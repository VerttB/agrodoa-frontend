"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUploadInput } from "@/components/ui/imageInput";
import { useUserContext } from "@/providers/UserProvider";
import { criarCausa } from "@/core/services/CausaService";
import { ACCEPTED_IMAGE_TYPE, MAX_FILE_SIZE } from "@/core/constants/values";

const solicitarCausaSchema = z.object({
  nome: z
    .string({ required_error: "O campo de nome de causa não deve estar vazio" })
    .min(3, "Nome muito curto"),
  meta: z.coerce.number().min(0.01, "Meta deve ser maior que zero"),
  prazo: z.string({ required_error: "Informe a data limite" }).refine(
    (dateStr) => {
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) && date > new Date();
    },
    {
      message: "A data deve ser válida e futura",
    }
  ),
  image: z
    .instanceof(File, { message: "Deve ser uma imagem" })
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Máximo 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
      "Extensão inválida"
    ),
  descricao: z
    .string({ required_error: "Descrição é obrigatória" })
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

type SolicitarCausaData = z.infer<typeof solicitarCausaSchema>;

export default function CriarCausaPage() {
  const router = useRouter();
  const { user } = useUserContext();
  const [open, setOpen] = useState(true); // apenas caso você precise controlar modal

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SolicitarCausaData>({
    resolver: zodResolver(solicitarCausaSchema),
  });

  const onSubmit = async (data: SolicitarCausaData) => {
    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("descricao", data.descricao);
      formData.append("meta", String(data.meta));
      formData.append("prazo", data.prazo);
      formData.append("imagem", data.image);

      await criarCausa(formData);
      reset();
      setOpen(false);
      router.push("/admin/causas"); // redireciona após sucesso
    } catch (error) {
      console.error("Erro ao criar causa:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-center rounded-2xl px-4 ">

    <div className="rounded-xl bg-neutral flex h-16 w-full px-4 items-center justify-between text-black">
        <h1 className="text-2xl">Criar Nova Causa</h1>
      <div
        className="flex cursor-pointer items-center px-4">
        <Image src="/logo.png" height={48} width={48} alt="Logo imagem" />
        <span className="font-sofia ml-2 text-black text-xl">Agrodoa</span>
      </div>
    </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  bg-neutral rounded-lg shadow-md p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold">Nova Causa</h1>
        <p className="text-muted">Preencha os campos abaixo para cadastrar uma nova causa de doação.</p>
        <div className="flex gap-4">
        <Input
          label="Nome da Causa"
          placeholder="Insira o nome da causa"
          className="bg-white w-full"
          {...register("nome")}
          errors={errors.nome?.message}
        />

        <Input
          label="Meta (R$)"
          type="number"
          step="0.01"
          placeholder="Ex: 1000.00"
          className="bg-white w-full"
          {...register("meta")}
          errors={errors.meta?.message}
        />
        </div>
        <Input
          label="Prazo (data limite)"
          type="date"
          className="bg-white w-full"
          {...register("prazo")}
          errors={errors.prazo?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            {...register("descricao")}
            placeholder="Descreva os motivos, o contexto ou o objetivo desta causa"
            className="w-full min-h-[100px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.descricao && (
            <p className="text-sm text-red-500 mt-1">
              {errors.descricao.message}
            </p>
          )}
        </div>

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

        <div className="flex justify-end gap-4 pt-6">
          <Button type="button" variant="outlined" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Criar Causa
          </Button>
        </div>
      </form>
    </div>
  );
}
