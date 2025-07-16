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
import { SelectInput } from "../ui/selectInput";
import { criarProduto } from "@/core/services/ProdutoService";
import { criarAnuncio } from "@/core/services/AnuncioService";
import { useRouter } from "next/navigation";
import { useEstadosECidades } from "@/hooks/useEstadosECidades";

const createAdSchema = z
  .object({
    titulo: z.string().min(3, "Título muito curto").max(100),
    nome: z.string().min(3, "Nome do produto muito curto").max(100),
    descricao: z.string().min(10, "Descrição muito curta").max(300),
    quantidade: z.coerce
      .number()
      .int()
      .gte(1, "Quantidade mínima 1")
      .lte(10000, "Quantidade máxima 10000"),
    preco_unidade: z.coerce.number().optional(),
    data_validade: z.string().refine(
      (val) => {
        const date = new Date(val);
        return date > new Date();
      },
      { message: "A data de validade deve ser futura" }
    ),
    data_expiracao: z.string().refine(
      (val) => {
        const date = new Date(val);
        return date > new Date();
      },
      { message: "A data de expiração deve ser futura" }
    ),
    entrega_pelo_fornecedor: z.enum(["true", "false"], {
      required_error: "Informe se o fornecedor entrega",
    }),
    cidade: z.string().min(1, "Informe a cidade"),
    tipoAnuncio: z.enum(["DOACAO", "VENDA"], {
      required_error: "Informe o tipo do anúncio",
    }),
    image: z
      .instanceof(File, { message: "Deve ser uma imagem" })
      .refine((file) => file?.size <= MAX_FILE_SIZE, "Máximo 5MB")
      .refine(
        (file) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
        "Extensão inválida"
      ),
  })
  .refine(
    (data) =>
      data.tipoAnuncio === "DOACAO" || (data.preco_unidade ?? 0) >= 0.05,
    {
      path: ["preco_unidade"],
      message: "Preço mínimo R$0,05",
    }
  );

type CreateAdData = z.infer<typeof createAdSchema>;

export const CriarAnuncio = () => {
  const { estados, cidades, estadoSelecionado, setEstadoSelecionado } =
      useEstadosECidades();
  
  const [open, setOpen] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<CreateAdData>({
    resolver: zodResolver(createAdSchema),
  });

  const tipoAnuncio = watch("tipoAnuncio");

  const onSubmit = async (data: CreateAdData) => {
    let idAnuncio = 0;
    const produto = {
      nome: data.nome,
      quantidade: data.quantidade,
      dataValidade: data.data_validade,
      precoUnidade: data.tipoAnuncio === "DOACAO" ? 0 : data.preco_unidade,
    };

    try {
      const res = await criarProduto(produto);
      if (res.idProduto) idAnuncio = res.idProduto;
    } catch (e) {
      console.error("Erro ao criar produto:", e);
    }

    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("imagem", data.image);
    formData.append(
      "entregaPeloFornecedor",
      data.entrega_pelo_fornecedor === "true" ? "1" : "0"
    );
    formData.append("tipoAnuncio", data.tipoAnuncio);
    formData.append("cidadeId", data.cidade);
    formData.append("produtoId", String(idAnuncio));
    formData.append("dataExpiracao", data.data_expiracao);
    formData.append("descricao", data.descricao);

    try {
      const res = await criarAnuncio(formData);
      console.log(res);
      setOpen(false);
      reset();
      setEtapa(1);
      router.refresh();
    } catch (e) {
      console.error("Erro ao criar anúncio:", e);
    }
  };

  const handleNext = async () => {
    const valid = await trigger([
      "titulo",
      "cidade",
      "entrega_pelo_fornecedor",
      "data_expiracao",
      "tipoAnuncio",
    ]);
    if (valid) setEtapa(2);
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
            {etapa === 1 && (
              <>
                <Input
                  label="Título do Anúncio"
                  placeholder="Ex: Oferta de Tomate"
                  {...register("titulo")}
                  errors={errors.titulo?.message}
                  className="w-full"
                />
               <div className="flex w-full gap-2">
                  <SelectInput
                   
                    data={estados.map((e) => ({ value: e.id, text: e.nome }))}
                    onChange={(e) => {
                      setEstadoSelecionado(e.target.value);
                    
                    }}
                    label="Estado"
                    placeholder="Ex: Bahia"
                    className="flex-1 bg-white py-2"
                  />
                  <SelectInput
                    {...register("cidade")}
                    data={
                      cidades?.map((c) => ({ value: c.id, text: c.nome })) ?? []
                    }
                    disabled={!estadoSelecionado}
                    label="Cidade"
                    errors={errors.cidade?.message}
                    placeholder="Selecione a cidade"
                    className="flex-1 bg-white py-2"
                  />
                </div>
                <SelectInput
                  label="Entrega pelo Fornecedor"
                  data={[
                    { value: "true", text: "Sim" },
                    { value: "false", text: "Não" },
                  ]}
                  className="mt-1 w-full"
                  {...register("entrega_pelo_fornecedor")}
                  errors={errors.entrega_pelo_fornecedor?.message}
                />
                <SelectInput
                  label="Tipo do Anúncio"
                  data={[
                    { value: "DOACAO", text: "Doação" },
                    { value: "VENDA", text: "Venda" },
                  ]}
                  className="mt-1 w-full"
                  {...register("tipoAnuncio")}
                  errors={errors.tipoAnuncio?.message}
                />
                <Input
                  label="Data de Expiração"
                  type="date"
                  {...register("data_expiracao")}
                  errors={errors.data_expiracao?.message}
                  className="w-full"
                />
              </>
            )}

            {etapa === 2 && (
              <>
                <Input
                  label="Nome do Produto"
                  placeholder="Ex: Tomate"
                  {...register("nome")}
                  errors={errors.nome?.message}
                  className="w-full"
                />
                <textarea
                  placeholder="Descrição do produto"
                  {...register("descricao")}
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.descricao && (
                  <p className="text-sm text-red-500">
                    {errors.descricao.message}
                  </p>
                )}
                <Input
                  label="Quantidade"
                  type="number"
                  {...register("quantidade")}
                  errors={errors.quantidade?.message}
                  className="w-full"
                />
                {tipoAnuncio === "VENDA" && (
                  <Input
                    label="Preço por Unidade"
                    type="number"
                    {...register("preco_unidade")}
                    step={0.01}
                    errors={errors.preco_unidade?.message}
                    className="w-full"
                  />
                )}
                <Input
                  label="Data de Validade"
                  type="date"
                  {...register("data_validade")}
                  errors={errors.data_validade?.message}
                  className="w-full"
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
                      className="w-full"
                    />
                  )}
                />
              </>
            )}
            <Modal.Actions>
              {etapa > 1 && (
                <Button
                  variant="outlined"
                  onClick={() => setEtapa(etapa - 1)}
                  type="button"
                >
                  Voltar
                </Button>
              )}
              {etapa < 2 && (
                <Button onClick={handleNext} type="button">
                  Próximo
                </Button>
              )}
              {etapa === 2 && <Button type="submit">Criar</Button>}
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                type="button"
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
