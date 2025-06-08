"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCpfCnpj } from "@/utils/formatCpfCnpj";
import { formatTel } from "@/utils/formatTel";
export default function Cadastro() {
  const userRegisterchema = z.object({
    email: z
      .string()
      .nonempty("O campo de email não deve estar vazio")
      .email("Deve estar no formato de email "),
    password: z
      .string()
      .nonempty("O campo da senha não deve estar vazio")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .nonempty("Preencha com a mesma senha que inseriu"),
    cpfCnpj: z
      .string({
        required_error: "CPF/CNPJ é obrigatório",
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length >= 11 && replacedDoc.length <= 14;
      }, "CPF/CNPJ deve ter no mínimo 11 caracteres")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length <= 14;
      }, "CPF/CNJP deve ter no máximo 14 caracteres")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!Number(replacedDoc);
      }, "CPF/CNPJ deve conter apenas números"),
    phone: z.string(),
  });

  type userRegisterData = z.infer<typeof userRegisterchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegisterData>({
    resolver: zodResolver(userRegisterchema),
  });

  const onSubmit = (data: userRegisterData) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-[url(/backgroundAuth.jpg)] bg-cover">
      <div className="flex m-2 lg:m-0 lg:w-2/5 flex-col justify-around rounded-tl-[100px] rounded-br-[100px] bg-white/60 shadow-2xl backdrop-blur-2xl backdrop-opacity-60">
        <div className="flex h-1/5 w-full items-center justify-center gap-2 self-center border-b-1">
          <Image
            src="/logo.png"
            width={64}
            height={64}
            alt="Imagem da logo"
          ></Image>
          <h1 className="font-sofia"> Agrodoa</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col items-center gap-6 self-center rounded-md p-5 "
        >
          <div className="flex lg:w-2/3 flex-col gap-1">
            <h3 className="text-2xl font-medium">Cadastro</h3>
            <p>Preencha os campos abaixo para criar a sua conta</p>
          </div>
          <div className="flex  lg:w-2/3 flex-col gap-2">
            <Input
              label="Email"
              type="text"
              id="email"
              {...register("email")}
              placeholder="Insira seu email"
              errors={errors.email?.message}
              className="bg-white py-2"
            />
            <div className="flex gap-2">
              <Input
                type="text"
                id="cpfCnpj"
                {...register("cpfCnpj")}
                label="CPF/CNPJ"
                errors={errors.cpfCnpj?.message}
                placeholder="Insira seu cpf/cnpj"
                className="w-full bg-white py-2"
                onChange={(e) => {
                  e.target.value = formatCpfCnpj(e.target.value);
                }}
              />
              <Input
                type="text"
                id="confirmarSenha"
                {...register("phone")}
                label="Telefone"
                errors={errors.phone?.message}
                placeholder="Insira seu telefone"
                className="w-full bg-white py-2"
                onChange={(e) => {
                  e.target.value = formatTel(e.target.value)
                }}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                id="senha"
                {...register("password")}
                label="Senha"
                errors={errors.password?.message}
                placeholder="Insira sua senha"
                className="w-full bg-white py-2"
              />
              <Input
                type="text"
                id="confirmarSenha"
                {...register("confirmPassword")}
                label="Confirmar Senha"
                errors={errors.confirmPassword?.message}
                placeholder="Insira sua senha"
                className="w-full bg-white py-2"
              />
            </div>
            <div className="mt-4 max-lg:items-center flex flex-col gap-2">
              <Link className="text-sm text-blue-500 self-start" href={"/login"}>
                Já possui conta? Faça login.
              </Link>
              <Button
                className="rounded-2xl w-full py-1 max-lg:w-4/5"
                variant="primary"
                type="submit"
              >
                Cadastrar
              </Button>
              <Button className="rounded-4xl py-1 max-lg:w-4/5" variant="outlined">
                Cadastrar com Google              
                </Button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
