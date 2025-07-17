"use client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import Image from "next/image";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1">
        <aside className="w-64 bg-secondary-darker  border-gray-200 flex flex-col justify-between py-6 px-4">
          <div>
            <h1 className="text-lg font-bold text-white mb-2">Admin</h1>
            <h2 className="text-sm text-white mb-4">Opções</h2>
            <div className="flex flex-col gap-4">
              <Button className="">
                Usuários
              </Button>
              <Button className="">
                Causas
              </Button>
              <Button className="">
                Enquetes
              </Button>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-white">
          <Image
            src="/logo.png"
            height={48}
            width={48}
            alt="Logo imagem"
          ></Image>
            <span className="font-bold text-white">Agrodoa</span>
          </div>
        </aside>
      
        <section className="flex-1 bg-primary p-4 overflow-auto">
          {children}
        </section>
      </main>

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
    </div>
  );
}
