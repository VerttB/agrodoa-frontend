"use client";
import Image from "next/image";
import { Header } from "@/components/header";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header></Header>
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
