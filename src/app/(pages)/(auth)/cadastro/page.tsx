"use client";

import  Input  from "@/components/input";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCpfCnpj } from "@/utils/formatCpfCnpj";
export default function Cadastro() {
  const userLoginSchema = z.object({
    email: z
      .string()
      .nonempty("O campo de email não deve estar vazio")
      .email("Deve estar no formato de email "),
    password: z
      .string()
      .nonempty("O campo da senha não deve estar vazio")
      .min(6,"A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .nonempty("Preencha com a mesma senha que inseriu"),
    cpfCnpj: z
      .string({
        required_error: "CPF/CNPJ é obrigatório"
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '');
        return replacedDoc.length >= 11 && replacedDoc.length <= 14;
      }, 'CPF/CNPJ deve ter no mínimo 11 caracteres')
      .refine(doc => {
        const replacedDoc = doc.replace(/\D/g, '');
        return replacedDoc.length <= 14;
      }, "CPF/CNJP deve ter no máximo 14 caracteres")
      .refine(doc => {
        const replacedDoc = doc.replace(/\D/g, '');
        return !!Number(replacedDoc) 
      }, "CPF/CNPJ deve conter apenas números"),
   phone: z 
      .string()
      
  });

  type userLoginData = z.infer<typeof userLoginSchema>;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userLoginData>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: userLoginData) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen justify-center items-center bg-[url(/backgroundAuth.jpg)] bg-cover ">
      <div className=" flex flex-col justify-around  w-2/5 bg-white/60  rounded-br-[100px] rounded-tl-[100px] shadow-2xl backdrop-opacity-60 backdrop-blur-2xl">
         <div className="flex justify-center items-center gap-2 self-center border-b-1 w-full h-1/5 ">
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
        className="flex w-full  flex-col h-full items-center  gap-6 self-center rounded-md p-4"
      >
       
        <div className="flex w-2/3 flex-col gap-1">
          <h3 className="text-2xl font-medium">Login</h3>
          <p>Preencha os campos abaixo para acessar sua conta</p>
        </div>
        <div className="w-2/3 flex flex-col gap-2">
          <Input
                label="Email"
                type="text"
                id="email"
                {...register("email")}
                placeholder="Insira seu email"
                errors={errors.email?.message}
                className="py-2 bg-white"/> 
           <div className="flex gap-2">
          <Input 
               
                type="text"
                id="cpfCnpj"
                {...register("cpfCnpj")}
                label="CPF/CNPJ" 
                errors={errors.cpfCnpj?.message}
                placeholder="Insira seu cpf/cnpj"
                className="py-2 bg-white w-full"
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
                className="py-2 bg-white w-full"
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
                className="py-2 bg-white w-full"
                />
          <Input
              type="text"
                id="confirmarSenha"
                {...register("confirmPassword")}
                label="Confirmar Senha" 
                errors={errors.confirmPassword?.message}
                placeholder="Insira sua senha"
                className="py-2 bg-white w-full"
              />
            </div>
          <div className="flex flex-col gap-2 mt-4">
            <Link className="text-sm text-blue-500" href={"/cadastro"}>
              Não possui conta? Cadastre-se aqui
            </Link>
            <Button className="py-1 rounded-2xl" variant="primary" type="submit">
              Entrar
            </Button>
            <Button className="py-1 rounded-4xl" variant="outlined">
              Entrar com Google
            </Button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}
