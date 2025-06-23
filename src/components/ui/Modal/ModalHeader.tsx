import { XIcon } from "lucide-react";

interface ModalHeaderProps {
  title?: string;
  onClose?: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between border-b-1 px-2 py-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {onClose && (
        <XIcon
          className="cursor-pointer"
          color="red"
          onClick={() => onClose()}
        />
      )}
    </div>
  );
};
