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
import { useUserContext } from "@/providers/UserProvider";
import { criarCausa } from "@/core/services/CausaService";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle } from "lucide-react";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "../ui/alert";
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
    },
  ),
  image: z
    .instanceof(File, { message: "Deve ser uma imagem" })
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Máximo 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
      "Extensão inválida",
    ),
  descricao: z
    .string({ required_error: "Descrição é obrigatória" })
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

type SolicitarCausaData = z.infer<typeof solicitarCausaSchema>;

export const SolicitarCausa = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useUserContext();
  const router = useRouter();
  const { show, message, type, showAlert, hideAlert } = useAlert();
  

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SolicitarCausaData>({
    resolver: zodResolver(solicitarCausaSchema),
  });
  const onSubmit = async (data: any) => {
    console.log("ENVIANDO CAUSA")
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("descricao", data.descricao);
      formData.append("meta", String(data.meta));
      formData.append("prazo", data.prazo);
      formData.append("imagem", data.image); 

      const sucess = await criarCausa(formData);
      showAlert("Causa Solicitada Com Sucesso", "success")
      reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Erro ao criar causa:", error);
      showAlert("Ocorreu um erro ao solicitar uma causa", "error")
    }finally{
      setIsLoading(false)
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  }
  return (
    <>
          <Alert message={message} type={type} show={show} onClose={hideAlert} />
          <Button
            className=" gap-1"
            variant="primary"
            onClick={() => setOpen(true)}
          >
            {user?.tipo !== "administrador" ? "Solicitar Causa" : <><PlusCircle/> Nova Causa</>}
          </Button>

          <Modal.Root onOpenChange={setOpen} open={open}>
            <Modal.Header
              title="Solicitar Causa"
              onClose={() => handleClose()}
            />
            <Modal.Content className="min-w-[640px]">
              <form
                className="w-full space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  label="Nome da Causa"
                  placeholder="Insira o nome da causa"
                  className="w-full bg-white"
                  {...register("nome")}
                  errors={errors.nome?.message}
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
                <div>
                  <label className="mb-1 block  font-medium text-gray-800">
                    Descrição
                  </label>
                  <textarea
                    {...register("descricao")}
                    placeholder="Descreva os motivos, o contexto ou o objetivo desta causa"
                    className="min-h-[100px] w-full rounded border border-gray-300 bg-white p-2"
                  />
                  {errors.descricao && (
                    <p className="text-sm text-red-500">
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
                <Modal.Actions>
                  <Button disabled={isLoading} className="px-4 py-1" type="submit">
                    {isLoading ? (
                                <>
                                  <Loader2 className="animate-spin w-4 h-4" />
                                  Enviando...
                                </>
                              ) : user?.tipo === "fornecedor" ? (
                                "Solicitar Causa"
                              ) : (
                                "Criar Causa"
                              )}
                  </Button>
                  <Button
                    className="px-4 py-1"
                    variant="outlined"
                    onClick={() => handleClose()}
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
