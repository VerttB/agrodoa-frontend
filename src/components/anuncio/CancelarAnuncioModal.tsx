import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";

interface CancelarAnuncioProps {
  id: number;
  titulo: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CancelarAnuncioModal = ({
  id,
  titulo,
  open,
  onOpenChange,
}: CancelarAnuncioProps) => {
  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Header title="Cancelar Anúncio" />
      <Modal.Content className="min-w-[640px]">
        <div className="flex flex-col gap-2">
          <h2>
            Digite o nome completo do anúncio que deseja excluir no campo abaixo
            para prosseguir com o cancelamento.
          </h2>
          <p>Essa ação não poderá ser desfeita</p>
          <p className="font-bold">{titulo}</p>
        </div>
        <Modal.Actions className="justify-end">
          <Button onClick={() => console.log(id)}>Confirmar</Button>
          <Button onClick={() => onOpenChange(false)} variant="outlined">
            Cancelar
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  );
};
