"use client";
import Button from "@/components/button";
import Image from "next/image";
import { SquareCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const router = useRouter();

  return (
    <div className="m-auto flex flex-col gap-6 xl:w-3/4 2xl:w-2/4">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex w-full flex-col gap-4">
          <h1 className="ld:text-4xl text-lg font-medium md:text-2xl">
            Você sabia que toneladas de alimentos são desperdiçadas todos os
            dias, enquanto tantas famílias ainda passam fome?
          </h1>
          <p className="text-xl max-lg:hidden">
            O <strong>AgroDoa</strong> nasceu para mudar essa realidade,
            conectando doadores, compradores e quem precisa de ajuda, de forma
            simples, segura e humana.
          </p>
        </div>
        <Image
          className="self-center md:max-w-[760px] lg:w-full"
          src={"/homeImg.png"}
          alt="imagem pagina inicial"
          width={480}
          height={48}
        ></Image>
      </div>
      <div className="flex h-fit flex-col gap-4">
        <p className="lg:hidden">
          O <strong>AgroDoa</strong> nasceu para mudar essa realidade,
          conectando doadores, compradores e quem precisa de ajuda, de forma
          simples, segura e humana.
        </p>
        <ul className="flex h-fit flex-col gap-2 rounded-lg bg-white p-4 text-sm md:text-lg [&>li]:flex [&>li]:gap-2 [&>li]:text-sm md:[&>li]:text-lg">
          Aqui você pode:
          <li>
            <span>
              <SquareCheckBig color="green" size={24} />
            </span>{" "}
            Doar alimentos que ainda estão em bom consumo
          </li>
          <li>
            <span>
              <SquareCheckBig color="green" size={24} />
            </span>{" "}
            Vender sua colheita excedente, evitando desperdício e ganhando renda
            extra
          </li>
          <li>
            <span>
              <SquareCheckBig color="green" size={24} />
            </span>
            Comprar produtos direto de quem produz, com preço justo
          </li>
          <li>
            <span>
              <SquareCheckBig color="green" size={24} />
            </span>{" "}
            Apoiar causas sociais com doações voluntárias
          </li>
        </ul>

        <div className="flex flex-col gap-4">
          <span className="text-center text-sm">
            Crie sua conta agora agora mesmo e ajude a construir uma rede mais
            justa consciente e sustentável
          </span>
          <Button
            variant="primary"
            className="w-1/2 self-center px-4 py-2"
            onClick={() => router.push("/cadastro")}
          >
            Cadastre-se
          </Button>
        </div>

        <div className="bg-secondary-light rounder-lg flex flex-col gap-4 p-6">
          <p className="text-sm md:text-xl">
            O <strong>AgroDoa</strong> está alinhado ao{" "}
            <strong>ODS 2 da ONU</strong>: acabar com a fome, alcançar segurança
            alimentar e promover agricultura sustentável. Ao participar, você
            colabora com um mundo mais justo e resiliente.
          </p>

          <Link
            href={"https://brasil.un.org/pt-br/sdgs/2"}
            className="underline"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
}
