import Input from "@/components/input"

interface PagamentoProps{
  nome: string,
  quantidade:number,
  valor: number,
}

export default function Pagamento({nome,quantidade,valor} : PagamentoProps) {
  return( 
    <div className="min-h-screen flex flex-col md:flex-row w-full p-8 gap-8">
        <div className="flex flex-col w-full gap-8">
        <h2 className="text-2xl">Dados da Compra</h2>
        <div className="flex flex-col w-full">
          <Input label="Produto" className="rounded-xl bg-neutral  border-accent" value={"Maçã"} disabled/>
          <Input label="Quantidade" className="rounded-xl bg-neutral  border-accent" value={500} disabled/>
          <Input  label="Preço "  className="rounded-xl bg-neutral  border-accent" value={"R$ 150,00"}disabled/>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8">
            <h2 className="text-2xl">Selecione a forma de pagamento</h2>
            <div className="w-full flex flex-col">
            <Input className="rounded-xl bg-neutral border-accent" label="Forma de Pagamento" value={"PIX"} disabled/>
            <h3 className="py-1">Realize o pagamento utilizando o código pix abauxo,ou, leia o QR code</h3>
            <Input className="rounded-xl bg-neutral  border-accent" label="Chave Pix" disabled/>
            </div>
        </div>
    </div>
  )
}
