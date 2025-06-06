"use client";
import Input from "@/components/input";
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
    formState: { errors },
  } = useForm<userLoginData>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: userLoginData) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-[url(/backgroundAuth.jpg)] bg-cover">
      <div className="flex m-2 md:m-0 md:h-3/4 md:w-2/5 flex-col justify-around rounded-tl-[100px] rounded-br-[100px] bg-white/60 shadow-2xl backdrop-blur-2xl backdrop-opacity-60">
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
          className="flex h-full w-full flex-col items-center gap-6 self-center rounded-md p-4"
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
              className="bg-white py-2"
            />
            <Input
              type="text"
              id="senha"
              {...register("senha")}
              label="Senha"
              errors={errors.senha?.message}
              placeholder="Insira sua senha"
              className="bg-white py-2"
            />

            <div className="mt-4 flex flex-col gap-2">
              <Link className="text-sm text-blue-500" href={"/cadastro"}>
                Não possui conta? Cadastre-se aqui
              </Link>
              <Button
                className="rounded-2xl py-1"
                variant="primary"
                type="submit"
              >
                Entrar
              </Button>
              <Button className="rounded-4xl py-1" variant="outlined">
                Entrar com Google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
