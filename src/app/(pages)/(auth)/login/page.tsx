"use client";
import { FormEvent } from "react";
import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className="flex flex-col gap-4 self-center rounded-md bg-white p-6"
      onSubmit={handleSubmit}
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
          name="email"
          id="email"
          placeholder="Insira seu email"
        />
      </label>
      <label className="flex flex-col gap-1" htmlFor="senha">
        Senha
        <input
          className="border-secondary-light border-2 border-solid px-2 py-1"
          type="text"
          name="senha"
          id="senha"
          placeholder="Insira sua senha"
        />
        <p className="text-sm">Esqueceu a senha?</p>
      </label>
      <div className="flex flex-col gap-2">
        <Link className="text-sm text-blue-400" href={"/cadastro"}>
          Não possui conta? Cadastre-se aqui
        </Link>
        <Button className="py-1" variant="primary">
          Entrar
        </Button>
        <Button className="py-1" variant="outlined">
          Entrar com Google
        </Button>
      </div>
    </form>
  );
}
