"use client"
import Button from "@/components/button";
import { Card } from "@/components/Card";
import { causas } from "@/contants/Causas";
import { useRouter } from "next/navigation";

export default function Causas() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center h-screen p-8">
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex w-3/4">
          <input
            className="border-secondary h-12 w-full border-2"
            type="text"
            placeholder="Digite o nome de uma causa"
          />
          <Button className="w-1/6 px-2 py-2" variant="primary">
            Buscar
          </Button>
        </div>
        
  {causas.map((c,i) => (
  <Card.Root  key={c.nome} className="flex flex-col w-4/5 md:flex-row md:items-stretch rounded overflow-hidden bg-white">
  <Card.Image
    alt="Imagem da causa"
    imageUrl="/mato.jpg"
    className="md:w-2/5 md:h-[220px] border-none"
  />
  <Card.Content className="gap-4 md:w-3/5 flex flex-col md:justify-between  md:gap-4  md:p-4">
    <div>
      <h1 className="text-lg md:text-xl text-center">{c.nome}</h1>
      <p className="hidden md:block mt-2">{c.descricao}</p>
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-2 w-full rounded bg-gray-200">
        <div
          className="bg-accent h-full rounded"
          style={{ width: `${(c.arrecadado / c.meta) * 100}%` }}
        />
      </div>
      <div className="flex w-full justify-between text-sm">
        <p>Arrecadado: {c.arrecadado.toLocaleString("pt-br")}</p>
        <p>Meta: R${c.meta.toLocaleString("pt-br")}</p>
      </div>
    </div>
    <Card.Actions className="flex-col gap-2 p-0 border-none">
      <Button onClick={() => router.push(`/causas/${c.id}`)}>Doar</Button>
      <Button variant="outlined">Salvar</Button>
    </Card.Actions>
  </Card.Content>
</Card.Root>))}
  
         
      </div>
    </div>
  );
}
