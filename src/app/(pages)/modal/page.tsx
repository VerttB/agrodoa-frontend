'use client'
import Button from "@/components/button"
import Input from "@/components/input"
import { Modal } from "@/components/Modal/Modal"
import { useState } from "react"

export default function ModalPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Abrir Modal
      </button>

    
        <Modal.Root onOpenChange={() => setOpen(false)} open={open}>
          <Modal.Header
            title="Criar Anúncio"
            onClose={() => setOpen(false)}
          />
          <Modal.Content className="min-w-[640px]">
            <Input label="Nome do Anúncio" placeholder="Insira o nome do seu anúncio"  className="bg-white"/>
            <Input label="Nome do Produto" placeholder="Insira o nome do produto"  className="bg-white"/>
            <Input label="Quantidade" placeholder="Insira a quantidade do produto "  className="bg-white"/>
            <Input label="Preço da Unidade" placeholder="Insira o preço da unidade do produto" className="bg-white"></Input>
            <Input type="file" accept="image/*" className="h-32 bg-white" ></Input>

          </Modal.Content>
          <Modal.Actions>
            <Button className="px-4 py-1" onClick={() => {}}>Criar</Button>
            <Button className="px-4 py-1" variant="outlined" onClick={() => setOpen(false)}>Fechar</Button>
          </Modal.Actions>
        </Modal.Root>
      
    </>
  )
}
