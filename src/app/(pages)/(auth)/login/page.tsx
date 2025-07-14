"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserContext } from "@/providers/UserProvider";

export default function Login() {
  const { login } = useUserContext();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

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
    clearErrors,
    formState: { errors },
  } = useForm<userLoginData>({
    resolver: zodResolver(userLoginSchema),
  });

  const onInvalid = () => {
    console.log(errors);
    setTimeout(() => clearErrors(), 3000);
  };

  const onSubmit = async (data: userLoginData) => {
    try {
      setLoginError(null);
      const sucess = await login(data.email, data.senha);
      if (sucess) router.push("/anuncios");
      else setLoginError("Credencias inválidas ou erro de servidor");
    } catch (error: any) {
      setLoginError(error.message || "Erro ao realizar login");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[url(/backgroundAuth.jpg)] bg-cover">
      <div className="m-2 flex flex-col justify-around rounded-tl-[100px] rounded-br-[100px] bg-white/60 shadow-2xl backdrop-blur-2xl backdrop-opacity-60 lg:m-0 lg:w-2/5 xl:min-h-[520px] xl:w-2/6">
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
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex h-full w-full flex-col items-center gap-6 self-center rounded-md p-4"
        >
          <div className="flex flex-col gap-1 lg:w-2/3">
            <h3 className="text-2xl font-medium">Login</h3>
            <p>Preencha os campos abaixo para acessar sua conta</p>
          </div>
          <div className="w-full lg:w-2/3">
            <Input
              label="Email"
              type="text"
              id="email"
              {...register("email")}
              placeholder="Insira seu email"
              errors={errors.email?.message}
              className="w-full rounded-lg bg-white py-2"
            />
            <Input
              type="text"
              id="senha"
              {...register("senha")}
              label="Senha"
              errors={errors.senha?.message}
              placeholder="Insira sua senha"
              className="w-full rounded-lg bg-white py-2"
            />

            <div className="mt-4 flex flex-col gap-2 max-lg:items-center">
              <Link className="text-sm text-blue-500" href={"/cadastro"}>
                Não possui conta? Cadastre-se aqui
              </Link>
              <Button
                className="py-1 max-lg:w-4/5"
                variant="primary"
                type="submit"
              >
                Entrar
              </Button>
              <Button className="py-1 max-lg:w-4/5" variant="outlined">
                Entrar com Google
              </Button>
              {loginError && (
                <p className="mt-2 text-center text-sm text-red-600">
                  {loginError}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
