"use client";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { z } from "zod";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anuncio } from "@/core/interfaces/Anuncio/Anuncio";
import { SelectInput } from "../ui/selectInput";
import { useEstadosECidades } from "@/hooks/useEstadosECidades";
import { editarAnuncio } from "@/core/services/AnuncioService";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "../ui/alert";
import { useRouter } from "next/navigation";
interface EditarAnuncioProps {
  anuncio: Anuncio;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const editAdSchema = z.object({
  name: z.string({
    required_error: "O campo de nome de anúncio não deve estar vazio",
  }),
  productName: z.string({
    required_error: "O campo do nome do produto não deve estar vazio",
  }),
  amount: z
    .coerce.number({
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
  data_expiracao: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      return date > new Date();
    }, { message: "A data de expiração deve ser futura" }),
  cidade: z.string().min(1, "Informe a cidade"),
  entrega_pelo_fornecedor: z.enum(["true", "false"], {
    required_error: "Informe se o fornecedor entrega",
  }),
  descricao: z.string(),
});

type EditAdData = z.infer<typeof editAdSchema>;

export const EditarAnuncio = ({open,onOpenChange,anuncio,}: EditarAnuncioProps) => {
  const { estados, cidades, estadoSelecionado, setEstadoSelecionado } = useEstadosECidades();
  const { show, message, type, showAlert, hideAlert } = useAlert();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditAdData>({
    resolver: zodResolver(editAdSchema),
    defaultValues: {
      name: anuncio.titulo,
      productName: anuncio.produto.nome,
      amount: anuncio.produto.quantidade,
      data_expiracao: anuncio.dataExpiracao
        ? new Date(anuncio.dataExpiracao).toISOString().substring(0, 10)
        : "",
      cidade: anuncio.local.cidade || "",
      entrega_pelo_fornecedor: anuncio.entregaPeloFornecedor ? "true" : "false",
      descricao: anuncio.descricao || "",
     
    },
  });


 const onSubmit = async (data: EditAdData) => {
 
  const anuncioNovo = {
    titulo: data.name,
    descricao: data.descricao,
    dataExpiracao: data.data_expiracao,
    entregaPeloFornecedor: data.entrega_pelo_fornecedor === "true" ? 1 : 0,
    produtoId: anuncio.produto.idProduto,
    cidadeId: data.cidade,
    quantidade: data.amount
  }

  
  console.log("ANUNCIO:" , data)
  try {
    await editarAnuncio(anuncio.idAnuncio, anuncioNovo);
    showAlert("Anúncio Editado com Sucesso", "success")
    router.refresh()
    onOpenChange(false); 
  } catch (error:any) {
    showAlert(error.message || "Ocorreu um erro ao tentar editar o anúncio", "error")

   
  }
};


  return (
    <>
    <Alert message={message} type={type} show={show} onClose={hideAlert} />
    
    <Modal.Root onOpenChange={onOpenChange} open={open}>
      <Modal.Header title="Editar Anúncio" onClose={() => onOpenChange(false)} />
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
            placeholder="Insira a quantidade do produto"
            type="number"
            className="w-full bg-white"
            {...register("amount")}
            errors={errors.amount?.message}
          />

          <Input
            label="Data de Expiração"
            type="date"
            className="w-full bg-white"
            {...register("data_expiracao")}
            errors={errors.data_expiracao?.message}
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
          <Controller
            control={control}
            name="entrega_pelo_fornecedor"
            render={({ field }) => (
              <SelectInput
                label="Entrega pelo fornecedor"
                data={[
                  { value: "true", text: "Sim" },
                  { value: "false", text: "Não" },
                ]}
                value={field.value}
                onChange={field.onChange}
                errors={errors.entrega_pelo_fornecedor?.message}
              />
            )}
          />

          <textarea
            {...register("descricao")}
            placeholder="Descrição do anúncio"
            className="w-full rounded-md border border-green-400 p-2"
            rows={4}
          />
          {errors.descricao && (
            <p className="text-sm text-red-600">{errors.descricao.message}</p>
          )}

       

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
    </>
  );
};
