import Image from "next/image";
import { useUserContext } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const headerItens = user
    ? ["Anuncios", "Causas", "Perfil"] // logado
    : ["Anuncios", "Causas"];         // deslogado

  return (
    <header className="bg-secondary-darker flex h-16 w-full flex-row-reverse items-center justify-between text-white">
      <ul className="flex gap-4 px-4 text-2xl">
        {headerItens.map((item) => (
          <li key={item}>
            <Link href={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
      <div
        onClick={() => router.push("/")}
        className="flex cursor-pointer items-center px-4"
      >
        <Image
          src="/logo.png"
          height={64}
          width={64}
          alt="Logo imagem"
        />
        <span className="font-sofia ml-2 text-xl">Agrodoa</span>
      </div>
    </header>
  );
};
