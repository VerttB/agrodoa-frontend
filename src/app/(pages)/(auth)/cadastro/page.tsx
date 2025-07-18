"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { formatCpfCnpj } from "@/core/utils/formatCpfCnpj";
import { formatTel } from "@/core/utils/formatTel";
import { SelectInput } from "@/components/ui/selectInput";
import { useEstadosECidades } from "@/hooks/useEstadosECidades";
import { useUserContext } from "@/providers/UserProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ACCEPTED_IMAGE_TYPE, MAX_FILE_SIZE } from "@/core/constants/values";
import { ImageUploadInput } from "@/components/ui/imageInput";

const userRegisterSchema = z
  .object({
    nome: z.string().nonempty("O nome é obrigatório"),
    email: z
      .string()
      .nonempty("O campo de email não deve estar vazio")
      .email("Deve estar no formato de email"),
    senha: z
      .string()
      .nonempty("O campo da senha não deve estar vazio")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z
      .string()
      .nonempty("Preencha com a mesma senha que inseriu"),
    cpfOuCnpj: z
      .string()
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length >= 11 && replacedDoc.length <= 14;
      }, "CPF/CNPJ inválido")
      .refine((doc) => !!Number(doc.replace(/\D/g, "")), "Apenas números"),
    telefone: z.string().nonempty("Telefone é obrigatório"),
    estado: z.string().nonempty("Estado é obrigatório"),
    idCidade: z.string().nonempty("Cidade é obrigatória"),
    tipoUsuario: z.string().nonempty("Tipo de usuário é obrigatório"),
    nomeArquivoFoto: z.string().optional(),
    image: z
    .instanceof(File, { message: "Deve ser uma imagem" })
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Máximo 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPE.includes(file?.type),
      "Extensão inválida"
    ),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas devem ser iguais",
    path: ["confirmarSenha"],
  });

type UserRegisterData = z.infer<typeof userRegisterSchema>;

export default function Cadastro() {
  const [etapa, setEtapa] = useState(1);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const { estados, cidades, estadoSelecionado, setEstadoSelecionado } =
    useEstadosECidades();

  const tiposUsuario = [
    { value: "fornecedor", text: "Fornecedor" },
    { value: "beneficiario", text: "Beneficiário" },
  ];

  const { cadastro } = useUserContext();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const handleNext = async () => {
    const valid = await trigger(["nome", "email", "senha", "confirmarSenha"]);
    if (valid) setEtapa(2);
  };

  const handleBack = () => setEtapa(1);

  const onSubmit = async (data: UserRegisterData) => {
    const dadoUsuario = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      cpfOuCnpj: data.cpfOuCnpj,
      telefone: data.telefone,
      nomeArquivoFoto: data.nomeArquivoFoto || "",
      estado: data.estado,
      idCidade: data.idCidade,
      tipoUsuario: data.tipoUsuario,
    };
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("email", data.email);
    formData.append("senha", data.senha);
    formData.append("cpfOuCnpj", data.cpfOuCnpj);
    formData.append("telefone", data.telefone);
    formData.append("nomeArquivoFoto", data.nomeArquivoFoto || "");
    formData.append("estado", data.estado);
    formData.append("idCidade", data.idCidade)
    formData.append("tipoUsuario", data.tipoUsuario); 
    try {
      setRegisterError(null);
      setIsLoading(true);
      const success = await cadastro(formData);
      if (success) {
        console.log("Usuário cadastrado");
        router.push("/anuncios");
       
      } else {
        setRegisterError("Erro ao cadastrar usuário");
      }
    } catch (e: any) {
      setRegisterError(e.message || "Erro desconhecido ao cadastrar.");
    }finally{
      setIsLoading(false);
      setEtapa(1);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[url(/backgroundAuth.jpg)] bg-cover">
      <div className="m-2 flex flex-col justify-around rounded-tl-[100px] rounded-br-[100px] bg-white/60 shadow-2xl backdrop-blur-2xl backdrop-opacity-60 lg:m-0 lg:w-2/6">
        <div className="flex h-1/5 w-full items-center justify-center gap-2 self-center border-b-1">
          <Image src="/logo.png" width={64} height={64} alt="Imagem da logo" />
          <h1 className="font-sofia">Agrodoa</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full min-h-[480px] w-full flex-col items-center gap-6 self-center rounded-md p-5"
        >
          <div className="flex flex-col gap-1 lg:w-2/3">
            <h3 className="text-2xl font-medium">Cadastro</h3>
            <p>Etapa {etapa} de 2</p>
          </div>

          <div className="flex flex-col gap-2 lg:w-full">
            {etapa === 1 && (
              <>
                <div className="flex gap-2">
                  <Input
                    label="Nome"
                    type="text"
                    {...register("nome")}
                    placeholder="Insira seu nome completo"
                    errors={errors.nome?.message}
                    className="w-full bg-white py-2"
                  />
                  <Input
                    label="Email"
                    type="text"
                    {...register("email")}
                    placeholder="Insira seu email"
                    errors={errors.email?.message}
                    className="w-full bg-white py-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    {...register("senha")}
                    label="Senha"
                    errors={errors.senha?.message}
                    placeholder="Insira sua senha"
                    className="w-full bg-white py-2"
                  />
                  <Input
                    type="password"
                    {...register("confirmarSenha")}
                    label="Confirmar Senha"
                    errors={errors.confirmarSenha?.message}
                    placeholder="Confirme sua senha"
                    className="w-full bg-white py-2"
                  />
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
              </>
            )}

            {etapa === 2 && (
              <>
                <div className="flex gap-2">
                  <Input
                    maxLength={18}
                    {...register("cpfOuCnpj")}
                    label="CPF/CNPJ"
                    errors={errors.cpfOuCnpj?.message}
                    placeholder="Insira seu CPF/CNPJ"
                    className="w-full bg-white py-2"
                    onChange={(e) => {
                      e.target.value = formatCpfCnpj(e.target.value);
                    }}
                  />
                  <Input
                    maxLength={14}
                    {...register("telefone")}
                    label="Telefone"
                    errors={errors.telefone?.message}
                    placeholder="Insira seu telefone"
                    className="w-full bg-white py-2"
                    onChange={(e) => {
                      e.target.value = formatTel(e.target.value);
                    }}
                  />
                </div>

                <div className="flex w-full gap-2">
                  <SelectInput
                    {...register("estado")}
                    data={estados.map((e) => ({ value: e.id, text: e.nome }))}
                    onChange={(e) => {
                      setEstadoSelecionado(e.target.value);
                      setValue("estado", e.target.value);
                    }}
                    label="Estado"
                    errors={errors.estado?.message}
                    placeholder="Ex: Bahia"
                    className="flex-1 bg-white py-2"
                  />
                  <SelectInput
                    {...register("idCidade")}
                    data={
                      cidades?.map((c) => ({ value: c.id, text: c.nome })) ?? []
                    }
                    disabled={!estadoSelecionado}
                    label="Cidade"
                    errors={errors.idCidade?.message}
                    placeholder="Selecione a cidade"
                    className="flex-1 bg-white py-2"
                  />
                </div>

                <SelectInput
                  {...register("tipoUsuario")}
                  label="Tipo do Usuário"
                  data={tiposUsuario}
                  className="w-full bg-white py-2"
                  placeholder="Tipo do usuário"
                  errors={errors.tipoUsuario?.message}
                />

                <Input
                  {...register("nomeArquivoFoto")}
                  label="Nome da Foto (opcional)"
                  placeholder="foto-perfil.png"
                  errors={errors.nomeArquivoFoto?.message}
                  className="w-full bg-white py-2"
                />
              </>
            )}

            <div className="mt-4 flex flex-col gap-2 max-lg:items-center">
              <Link className="self-start text-sm text-blue-500" href="/login">
                Já possui conta? Faça login.
              </Link>

              {etapa === 1 && (
                <Button
                  className="py-1 max-lg:w-4/5"
                  variant="primary"
                  type="button"
                  onClick={handleNext}
                >
                  Próximo
                </Button>
              )}

              {etapa === 2 && (
                <>
                  <div className="flex w-full gap-2">
                    <Button
                      className="w-full py-1"
                      variant="outlined"
                      type="button"
                      onClick={handleBack}
                    >
                      Voltar
                    </Button>
                    <Button
                      className="w-full py-1"
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                     {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                  </div>
               
                </>
              )}

              {registerError && (
                <p className="mt-2 text-center text-sm text-red-600">
                  {registerError}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
