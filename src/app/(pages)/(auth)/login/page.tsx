"use client";

import  Input  from "@/components/input";
import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function Login() {
  const userLoginSchema = z.object({
    email: z
      .string()
      .nonempty("O campo de email não deve estar vazio")
      .email("Deve estar no formato de email "),
    senha: z.string().nonempty("O campo da senha não deve estar vazio"),
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
      <div className=" flex flex-col justify-around h-3/4 w-2/5 bg-white/60  rounded-br-[100px] rounded-tl-[100px] shadow-2xl backdrop-opacity-60 backdrop-blur-2xl">
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
        <div className="w-2/3">
          <Input
                label="Email"
                type="text"
                id="email"
                {...register("email")}
                placeholder="Insira seu email"
                errors={errors.email?.message}
                className="py-2 bg-white"/> 
          <Input 
                type="text"
                id="senha"
                {...register("senha")}
                label="Senha" 
                errors={errors.senha?.message}
                placeholder="Insira sua senha"
                className="py-2 bg-white"
                />

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
