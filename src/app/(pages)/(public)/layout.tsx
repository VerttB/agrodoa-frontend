
import Image from "next/image";
import Link from "next/link";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerBen = ["Inicio", "causas", "Perfil"];

  return (
  
      <>
        <header className="bg-secondary-darker flex h-16 w-full flex-row-reverse items-center justify-between text-white">
          <ul className="flex gap-4 px-4 text-2xl">
            {headerBen.map((item) => (
              <Link href={item} key={item}>
                {item}
              </Link>
            ))}
          </ul>
          <div className="flex items-center px-4">
            <Image
              src="/logo.png"
              height={64}
              width={64}
              alt="Logo imagem"
            ></Image>
            <span className="font-sofia">Agrodoa</span>
          </div>
        </header>
        <main className="flex-1 justify-center">{children}</main>
        <footer className="bg-secondary-darker flex h-12 w-full justify-center">
          <div className="flex items-center px-4 text-white">
            <Image
              src="/logo.png"
              height={48}
              width={48}
              alt="Logo imagem"
            ></Image>
            <span className="font-sofia">Agrodoa</span>
          </div>
        </footer>
     </>
  );
}
