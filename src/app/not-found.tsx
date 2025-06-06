import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="mt-4">Página não encontrada.</p>
      <Button onClick={() => router.push("/")}>Voltar para página inicial</Button>

    </div>
  );
}
