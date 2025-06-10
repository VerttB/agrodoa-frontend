"use client";
import Button from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";


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
            <span className="text-md">
              Crie sua conta agora agora mesmo e ajude a construir uma rede mais
              justa consciente e sustentável
            </span>
            <Button
              variant="primary"
              className="self-start px-12 py-2 shadow-2xs"
              onClick={() => router.push("/cadastro")}
            >
              Cadastre-se
            </Button>
          </div>
          <div className="xl:w-3/4">
            <Image
              className="object-cover"
              src={"/homeImg.png"}
              alt="imagem pagina inicial"
              width={720}
              height={40}
            ></Image>
          </div>
        </div>
        <div className="bg-secondary mb-8 flex flex-col gap-4 self-center rounded-xl p-6 shadow-2xl lg:w-2/4">
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
            className="justify-center self-end px-2 py-1 text-white lg:w-48"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="">
          <Image
            className="absolute w-full translate-y-4.5 md:-translate-y-6"
            src={"/Vector.svg"}
            alt="img"
            width={720}
            height={32}
          />
          <div className="from-primary to-secondary-darker h-12 w-full bg-gradient-to-b"></div>
        </div>

        <div className="bg-secondary-darker flex flex-col gap-8 p-2 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <Image
              className="self-center md:max-w-[760px] lg:w-2/5"
              alt="Imagem De Caridade"
              src={"/homeImg.png"}
              width={320}
              height={40}
            ></Image>
            <h2 className="font-light text-white md:self-center md:text-2xl">
              No AgroDoa, você também pode apoiar causas sociais ligadas à
              alimentação e se voluntariar para transformar a realidade de quem
              mais precisa. Junte-se a uma rede que vai além da doação: cultive
              solidariedade!
            </h2>
          </div>
          <div className="overflow-x-auto  w-full scroll-pl-4 scroll-smooth px-2">
            <div className="flex flex-nowrap gap-4 snap-x snap-mandatory md:flex-wrap md:justify-evenly">
            {provisorio.map((i) => (
              <Card.Root
                key={i}
                className="min-w-[250px] max-w-[280px] snap-start shrink-0 bg-primary flex flex-col rounded-lg text-black sm:w-full md:min-w-[280px] lg:w-full"
              >
                <Card.Image
                  alt="Imagem do Produto"
                  imageUrl="/fruits.jpg"
                  className="w-full"
                />
                <Card.Content>
                  <h2 className="text-xl font-bold">Titulo</h2>
                  <p className="text-md">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eum, distinctio, molestias qui tenetur voluptas a excepturi
                    cumque nemo sint, harum placeat porro?
                  </p>
                </Card.Content>
                <Card.Actions className="p-2">
                  <Button variant="primary" className="px-2 py-1 text-white">
                    Ver Detalhes
                  </Button>
                </Card.Actions>
              </Card.Root>
            ))}
          </div>
          </div>
        </div>
      </div>
      <div className="bg-[url(/mato.jpg)] bg-cover lg:h-screen">
        <div className="flex w-full flex-col justify-between gap-8 px-4 py-6 backdrop-blur-[4px] md:p-6 lg:h-full lg:gap-0">
          <div className="flex flex-col-reverse items-center gap-2 lg:flex-row">
            <h1 className="w-full text-xl lg:text-2xl">
              Aqui, fornecedores podem doar excedentes ou vender produtos
              agroalimentares com responsabilidade social. Beneficiários
              encontram tanto alimentos gratuitos quanto itens à venda por
              valores acessíveis, promovendo o equilíbrio entre
              sustentabilidade, dignidade e acesso.
            </h1>
            <Image
              className="self-center md:max-w-[760px] lg:w-2/5"
              alt="Imagem De Caridade"
              src={"/donation.jpeg"}
              width={320}
              height={40}
            ></Image>
          </div>

          <div className="overflow-x-auto  w-full scroll-pl-4 scroll-smooth px-2 shadow-2xl ">
          <div className="flex flex-nowrap gap-4 snap-x snap-mandatory  md:flex-wrap md:justify-evenly"> 
            {provisorio.map((i) => (
              <Card.Root
                key={i}
                className="bg-secondary-darker text-neutral border-none min-w-[250px] max-w-[280px] snap-start shrink-0  flex flex-col rounded-lg sm:w-full md:min-w-[280px] lg:w-full"
              >
                <Card.Image
                  alt="Imagem do Produto"
                  imageUrl="/fruits.jpg"
                  className="w-full border-none"
                />
                <Card.Content>
                  <h2 className="text-xl font-bold">Titulo</h2>
                  <p>Preço: 30,00</p>
                  <p>Negociantes: 0/5</p>
                  <p>Quantidade: 230</p>
                </Card.Content>
                <Card.Actions className="flex justify-between p-2">
                  <Button
                    variant="primary"
                    className="w-full px-2 py-1 text-sm md:text-md text-white"
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
    </div>
  );
}
