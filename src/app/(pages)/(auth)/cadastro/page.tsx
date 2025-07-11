"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCpfCnpj } from "@/core/utils/formatCpfCnpj";
import { formatTel } from "@/core/utils/formatTel";
import { SelectInput } from "@/components/ui/selectInput";
import { useEstadosECidades } from "@/hooks/useEstadosECidades";
import { useUserContext } from "@/providers/UserProvider";
import { useState } from "react";

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
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas devem ser iguais",
    path: ["confirmarSenha"],
  });


type UserRegisterData = z.infer<typeof userRegisterSchema>;

export default function Cadastro() {

  const [registerError, setRegisterError] = useState<string | null>(null); // Estado para erros do cadastro

  const {
      estados,
      cidades,
      estadoSelecionado,
      setEstadoSelecionado
} = useEstadosECidades();

  const tiposUsuario = [
    {value: "fornecedor", text: "Fornecedor"},
    {value: "beneficiario",text: "Beneficiário"}
  ]

  const { cadastro } = useUserContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterSchema),
  });

 

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

    try{
        const sucess = await cadastro(dadoUsuario);
        if(sucess) console.log("Usuário logado");
        else setRegisterError("Erro ao cadastrar usuário")
    }catch(e:any){
       setRegisterError(e.message || "Erro desconhecido ao cadastrar.");
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
          className="flex h-full w-full flex-col items-center gap-6 self-center rounded-md p-5 min-h-[480px]"
        >
          <div className="flex flex-col gap-1 lg:w-2/3">
            <h3 className="text-2xl font-medium">Cadastro</h3>
            <p>Preencha os campos abaixo para criar a sua conta</p>
          </div>

          <div className="flex flex-col gap-2 lg:w-full">
          <div className="flex gap-2">
            <Input
              label="Nome"
              type="text"
              id="nome"
              {...register("nome")}
              placeholder="Insira seu nome completo"
              errors={errors.nome?.message}
              className="bg-white py-2 w-full"
            />

            <Input
              label="Email"
              type="text"
              id="email"
              {...register("email")}
              placeholder="Insira seu email"
              errors={errors.email?.message}
              className="bg-white py-2 w-full"
            />
            </div>
            <div className="flex gap-2">
              <Input
                maxLength={18}
                type="text"
                id="cpfOuCnpj"
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
                type="text"
                id="telefone"
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

            <div className="flex gap-2">
              <Input
                type="password"
                id="senha"
                {...register("senha")}
                label="Senha"
                errors={errors.senha?.message}
                placeholder="Insira sua senha"
                className="w-full bg-white py-2"
              />
              <Input
                type="password"
                id="confirmarSenha"
                {...register("confirmarSenha")}
                label="Confirmar Senha"
                errors={errors.confirmarSenha?.message}
                placeholder="Confirme sua senha"
                className="w-full bg-white py-2"
              />
            </div>
            <div className="flex gap-2 w-full">
            <SelectInput
              type="text"
              id="estado"
              data={estados.map((e) => ({ value: e.id, text: e.nome }))}
              {...register("estado")}
                  onChange={(e) => {
                setEstadoSelecionado(e.target.value);
                setValue("estado", e.target.value);
              }}
              label="Estado"
              errors={errors.estado?.message}
              placeholder="Ex: Bahia"
              className="bg-white py-2 flex-1"
            />

            <SelectInput
              id="idCidade"
               data={
                  cidades?.map((c) => ({
                    value: c.id,
                    text: c.nome,
                  })) ?? []
                }
              disabled={!estadoSelecionado}
              {...register("idCidade")}
              label="ID da Cidade"
              errors={errors.idCidade?.message}
              placeholder="Insira o ID da cidade"
              className="bg-white py-2 flex-1"
            />
            </div>
            <SelectInput
                        id="tipoUsuario"
                        label="Tipo do Usuário"
                        data={tiposUsuario}
                        className="bg-white py-2 w-full"
                        {...register("tipoUsuario")}
                        placeholder="Tipo do usuário"
                        errors={errors.tipoUsuario?.message}

            />
            <Input
              type="text"
              id="nomeArquivoFoto"
              {...register("nomeArquivoFoto")}
              label="Nome da Foto (opcional)"
              errors={errors.nomeArquivoFoto?.message}
              placeholder="foto-perfil.png"
              className="bg-white py-2 w-full"
            />

            <div className="mt-4 flex flex-col gap-2 max-lg:items-center">
              <Link
                className="self-start text-sm text-blue-500"
                href={"/login"}
              >
                Já possui conta? Faça login.
              </Link>
              <Button
                className="py-1 max-lg:w-4/5"
                variant="primary"
                type="submit"
              >
                Cadastrar
              </Button>
              <Button className="py-1 max-lg:w-4/5" variant="outlined">
                Cadastrar com Google
              </Button>
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
