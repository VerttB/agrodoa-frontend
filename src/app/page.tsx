"use client";
import Button from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
export default function Home() {
  const router = useRouter();
  const provisorio = [1,2,3]
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col p-2 md:p-6 gap-24 h-full justify-between">
      <div className="flex flex-col gap-8 md:flex-row md:self-start">
        <div className="flex w-full justify-center flex-col gap-4">
          <h1 className="lg:text-4xl text-lg font-medium md:text-3xl">
            Você sabia que toneladas de alimentos são desperdiçadas todos os
            dias, enquanto tantas famílias ainda passam fome?
          </h1>
          <p className="text-xl max-lg:hidden">
            O <strong>AgroDoa</strong> nasceu para mudar essa realidade,
            conectando doadores, compradores e quem precisa de ajuda, de forma
            simples, segura e humana.
          </p>
          <span className=" text-sm">
            Crie sua conta agora agora mesmo e ajude a construir uma rede mais
            justa consciente e sustentável
          </span>
            <Button
            variant="primary"
            className="self-start py-1 px-10"
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
        <div className="bg-secondary rounded-xl flex flex-col gap-4 p-6">
          <p className="text-sm md:text-lg">
           <strong>AgroDoa</strong> está alinhado com o <strong>Objetivo de Desenvolvimento Sustentável 2 (ODS 2) da ONU</strong>:
          acabar com a fome, alcançar a segurança alimentar e promover a agricultura sustentável.
          Ao incentivar o aproveitamento de excedentes, o apoio aos pequenos produtores e a distribuição justa
           dos alimentos, ajudamos a transformar realidades — com consciência e propósito.
            </p>
          <Button variant="primary"  className="self-end w-48 text-white px-2 py-1" >
                  Saiba Mais
          </Button>
        </div>
      </div>
      <div className="bg-secondary-darker justify-evenly flex flex-col h-screen p-2 md:p-6 gap-8 ">

        <div className="flex align-middle gap-8">
          
            <Image 
            className="self-center md:max-w-[760px] lg:w-full"
            alt="Imagem De Caridade" 
            src={"/homeImg.png"}
            width={320}
            height={40}>
            </Image>
        <h2 className="text-white font-light md:self-center md:text-3xl">
          No AgroDoa, você também pode apoiar causas sociais ligadas à 
           alimentação e se voluntariar para transformar a realidade de quem mais  precisa. 
           Junte-se a uma rede que vai além da doação: cultive  solidariedade!
        </h2>
        </div>
          <div className="flex justify-between px-2 ">
            {provisorio.map((i) => 
              <Card.Root key={i} className="flex flex-col max-w-[280px] bg-primary rounded-lg">
              <Card.Image alt="Imagem do Produto" imageUrl="/fruits.jpg" size={64}/>
              <Card.Content>
                <h2 className="text-xl font-bold">Titulo</h2>
                <p className="text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, distinctio, molestias qui tenetur voluptas a excepturi cumque nemo sint, harum placeat porro?</p>
              </Card.Content>
              <Card.Actions>
                <Button variant="primary" className="px-2 py-1 text-white">
                  Ver Detalhes
                </Button>
              </Card.Actions>
            </Card.Root>
            )}
            
        </div>
      </div>
      <div className="h-screen  bg-[url(/mato.jpg)] bg-cover ">
      <div className="backdrop-blur-[4px] h-full w-full p-2 md:p-6 flex flex-col justify-between">
      <div className="flex items-center">
        <h1 className="text-3xl w-full">Aqui, fornecedores podem doar excedentes ou vender produtos agroalimentares com responsabilidade social.
          Beneficiários encontram tanto alimentos gratuitos quanto itens à venda por valores acessíveis, promovendo
            o equilíbrio entre sustentabilidade, dignidade e acesso.</h1>
            <Image 
            className="self-center md:max-w-[760px] lg:w-2/4"
            alt="Imagem De Caridade" 
            src={"/donation.jpeg"}
            width={480}
            height={40}>
            </Image>
        </div>
        <div className="flex justify-between px-2">
             {provisorio.map((i) => 
              <Card.Root key={i} className="flex flex-col md:min-w-[280px] max-w-[280px] bg-secondary-darker rounded-lg text-white">
              <Card.Image alt="Imagem do Produto" imageUrl="/fruits.jpg" size={64}/>
              <Card.Content>
                <h2 className="text-xl font-bold">Titulo</h2>
                <p>Preço: 30,00</p>
                <p>Negociantes: 0/5</p>
                <p>Quantidade: 230</p>
              </Card.Content>
              <Card.Actions className="flex justify-between">
                <Button variant="primary" className="px-2 py-1 w-full text-white">
                  Ver Detalhes
                </Button>
                <Button variant="outlined" className="px-4 py-1 w-full text-black">
                  Salvar
                </Button>
              </Card.Actions>
            </Card.Root>
            )}
            </div>
      </div>
      </div>
    </div>
  );
}
