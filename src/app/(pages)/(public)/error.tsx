"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-primary flex min-h-screen w-full items-center justify-center">
      <div className="flex h-96 w-1/4 flex-col items-center justify-center gap-12 rounded-2xl bg-white px-4 py-8 text-black shadow-2xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold">{error.message}</h1>
          <p>
            Não foi possível conectar ao servidor do AgroDoa. Verifique sua
            conexão ou tente novamente mais tarde.{" "}
          </p>
        </div>
        <Button className="w-1/2 text-xl" onClick={() => reset}>
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
}
