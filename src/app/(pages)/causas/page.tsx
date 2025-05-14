import CausaCard from "@/components/causasCard";
import Button from "@/components/button";
export default function Causas() {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex flex-col items-center gap-2">
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
        <CausaCard></CausaCard>
        <CausaCard></CausaCard>
        <CausaCard></CausaCard>
        <CausaCard></CausaCard>
        <CausaCard></CausaCard>
        <CausaCard></CausaCard>
      </div>
    </div>
  );
}
