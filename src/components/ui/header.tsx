"use client";
import Image from "next/image";
import { useUserContext } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useUserContext();
  const headerItens = user
    ? ["Anuncios", "Causas", "Perfil"] // logado
    : ["Login","Anuncios", "Causas"]; // deslogado

  return (
    <header className="bg-secondary-darker flex h-12 w-full flex-row-reverse items-center justify-between text-white">
      <ul className="flex gap-4 px-4 text-lg">
        {user && (
          <Button variant="ghost" className="text-sm py-1" onClick={() => logout()}>
            Deslogar
          </Button>
        )}
        {headerItens.map((item) => (
          <li key={item}>
            <Link
              className="hover:text-secondary-light"
              href={`/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <div
        onClick={() => router.push("/")}
        className="flex cursor-pointer items-center px-4"
      >
        <Image src="/logo.png" height={48} width={48} alt="Logo imagem" />
        <span className="font-sofia ml-2 text-xl">Agrodoa</span>
      </div>
    </header>
  );
};
