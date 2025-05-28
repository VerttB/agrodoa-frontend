"use client";
import Button from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import Waves from "@/assets/Vector.svg";
export default function Home() {
  const router = useRouter();
  const provisorio = [1, 2, 3];
  return (
    <div className="flex flex-col">
      <div className="flex h-full flex-col justify-between gap-24 p-2 md:p-6">
        <div className="flex flex-col-reverse gap-8 md:flex-row md:self-start">
          <div className="flex w-full flex-col justify-center gap-4">
            <h1 className="text-lg font-medium md:text-3xl lg:text-4xl">
              Você sabia que toneladas de alimentos são desperdiçadas todos os
              dias, enquanto tantas famílias ainda passam fome?
            </h1>
            <p className="text-xl max-lg:hidden">
              O <strong>AgroDoa</strong> nasceu para mudar essa realidade,
              conectando doadores, compradores e quem precisa de ajuda, de forma
              simples, segura e humana.
            </p>
            <span className="text-sm">
              Crie sua conta agora agora mesmo e ajude a construir uma rede mais
              justa consciente e sustentável
            </span>
            <Button
              variant="primary"
              className="self-start px-10 py-1"
              onClick={() => router.push("/cadastro")}
            >
              Cadastre-se
            </Button>
          </div>
          <Image
            className="self-center md:max-w-[760px] lg:w-full"
            src={"/homeImg.png"}
            alt="imagem pagina inicial"
            width={320}
            height={40}
          ></Image>
        </div>
        <div className="bg-secondary flex flex-col gap-4 rounded-xl p-6">
          <p className="text-sm md:text-lg">
            <strong>AgroDoa</strong> está alinhado com o{" "}
            <strong>
              Objetivo de Desenvolvimento Sustentável 2 (ODS 2) da ONU
            </strong>
            : acabar com a fome, alcançar a segurança alimentar e promover a
            agricultura sustentável. Ao incentivar o aproveitamento de
            excedentes, o apoio aos pequenos produtores e a distribuição justa
            dos alimentos, ajudamos a transformar realidades — com consciência e
            propósito.
          </p>
          <Button
            variant="primary"
            className="self-end px-2 py-1 text-white lg:w-48"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
      <div className="flex flex-col ">

        <div className="">
        <Image className="w-full translate-y-4.5 md:-translate-y-6 absolute" src={"/Vector.svg"} alt="img" width={720} height={32}/>
        <div className="bg-gradient-to-b from-primary to-secondary-darker w-full h-12 "></div>
        </div>


      <div className="bg-secondary-darker g:h-screen flex flex-col justify-evenly gap-8 p-2 md:p-6 ">
        <div className="flex flex-col gap-8 align-middle md:flex-row">

          <Image
            className="self-center md:max-w-[760px] lg:w-full"
            alt="Imagem De Caridade"
            src={"/homeImg.png"}
            width={320}
            height={40}
          ></Image>
          <h2 className="font-light text-white md:self-center md:text-3xl">
            No AgroDoa, você também pode apoiar causas sociais ligadas à
            alimentação e se voluntariar para transformar a realidade de quem
            mais precisa. Junte-se a uma rede que vai além da doação: cultive
            solidariedade!
          </h2>
        </div>
        <div className="flex justify-between px-2">
          {provisorio.map((i) => (
            <Card.Root
              key={i}
              className="bg-primary flex max-w-[280px] flex-col rounded-lg"
            >
              <Card.Image
                alt="Imagem do Produto"
                imageUrl="/fruits.jpg"
                size={64}
              />
              <Card.Content>
                <h2 className="text-xl font-bold">Titulo</h2>
                <p className="text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                  distinctio, molestias qui tenetur voluptas a excepturi cumque
                  nemo sint, harum placeat porro?
                </p>
              </Card.Content>
              <Card.Actions>
                <Button variant="primary" className="px-2 py-1 text-white">
                  Ver Detalhes
                </Button>
              </Card.Actions>
            </Card.Root>
          ))}
        </div>
      </div>
      </div>
      <div className="bg-[url(/mato.jpg)] bg-cover lg:h-screen">
        <div className="flex w-full flex-col justify-between gap-8 px-4 py-6 backdrop-blur-[4px] md:p-6 lg:h-full lg:gap-0">
          <div className="flex flex-col-reverse items-center gap-2 lg:flex-row">
            <h1 className="w-full text-xl lg:text-3xl">
              Aqui, fornecedores podem doar excedentes ou vender produtos
              agroalimentares com responsabilidade social. Beneficiários
              encontram tanto alimentos gratuitos quanto itens à venda por
              valores acessíveis, promovendo o equilíbrio entre
              sustentabilidade, dignidade e acesso.
            </h1>
            <Image
              className="self-center md:max-w-[760px] lg:w-2/4"
              alt="Imagem De Caridade"
              src={"/donation.jpeg"}
              width={480}
              height={40}
            ></Image>
          </div>
          <div className="flex justify-between px-2">
            {provisorio.map((i) => (
              <Card.Root
                key={i}
                className="bg-secondary-darker flex max-w-[280px] flex-col rounded-lg text-white md:min-w-[280px]"
              >
                <Card.Image
                  alt="Imagem do Produto"
                  imageUrl="/fruits.jpg"
                  size={64}
                />
                <Card.Content>
                  <h2 className="text-xl font-bold">Titulo</h2>
                  <p>Preço: 30,00</p>
                  <p>Negociantes: 0/5</p>
                  <p>Quantidade: 230</p>
                </Card.Content>
                <Card.Actions className="flex justify-between">
                  <Button
                    variant="primary"
                    className="w-full px-2 py-1 text-white"
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    variant="outlined"
                    className="w-full px-4 py-1 text-black"
                  >
                    Salvar
                  </Button>
                </Card.Actions>
              </Card.Root>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
