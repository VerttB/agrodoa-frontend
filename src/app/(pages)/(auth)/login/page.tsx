"use client";

import Button from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function Login() {
 
  const userLoginSchema = z.object({
    email : z.string().nonempty("O campo de email não deve estar vazio").email("Deve estar no formato de email "),
    senha : z.string().nonempty("O campo da senha não deve estar vazio")
  })
  
  type userLoginData = z.infer<typeof userLoginSchema>
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors},
  } = useForm<userLoginData>({
    resolver: zodResolver(userLoginSchema)
  })


  const onSubmit = (data : userLoginData) => {
    console.log(data)
    
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 self-center rounded-md bg-white w-1/4 p-6"
      
    >
      <div className="flex flex-col items-center gap-2 self-center">
        <Image
          src="/logo.png"
          width={64}
          height={64}
          alt="Imagem da logo"
        ></Image>
        <h1 className="font-sofia"> Agrodoa</h1>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-medium">Login</h3>
        <p>Preencha os campos abaixo para acessar sua conta</p>
      </div>
      <label className="flex flex-col gap-1" htmlFor="email">
        Email
        <input
          className="border-secondary-light border-2 border-solid px-2 py-1"
          type="text"
          {...register("email")}
          placeholder="Insira seu email"

        />
        {errors &&<span> {errors.email?.message} </span>}
      </label>
      <label className="flex flex-col gap-1" htmlFor="senha">
        Senha
        <input
          className="border-secondary-light border-2 border-solid px-2 py-1"
          type="text"
           {...register("senha")}
          id="senha"
          placeholder="Insira sua senha"
        />
        {errors &&<span> {errors.senha?.message}</span>}
        <p className="text-sm">Esqueceu a senha?</p>
      </label>
      <div className="flex flex-col gap-2">
        <Link className="text-sm text-blue-400" href={"/cadastro"}>
          Não possui conta? Cadastre-se aqui
        </Link>
        <Button className="py-1" variant="primary" type="submit">
          Entrar
        </Button>
        <Button className="py-1" variant="outlined">
          Entrar com Google
        </Button>
      </div>
        
    </form>
  );
}
