"use client";
import { capitalize } from "@/core/utils/capitalize";
import { useUserContext } from "@/providers/UserProvider";
import { UserCircle2Icon, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function Perfil() {
  const { user } = useUserContext();
  console.log(user);
  if (!user) return <p>e</p>;
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card.Root className="min-w-[640px] border-gray-400 shadow-lg shadow-gray-500/50">
        <Card.Content className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <UserCircle2Icon className="h-48 w-fit" />
            <h1 className="text-2xl font-bold">{user?.nome}</h1>
            <p className="text-xl font-medium text-gray-700">
              {capitalize(user.tipoUsuario)}
            </p>
            <div className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  strokeWidth={1}
                  fill="yellow"
                  color="black"
                  size={32}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Input
              className="w-full py-2"
              label="Email"
              readOnly
              value={user.email}
            />
            <Input
              className="w-full py-2"
              label="Telefone"
              readOnly
              value={user.telefone}
            />
            <Input
              className="w-full py-2"
              label="Cidade"
              readOnly
              value={user.cidade}
            />
            <Input
              className="w-full py-2"
              label="CPF_CNPJ"
              readOnly
              value={user.cpfOuCnpj}
            />
            <Input
              className="w-full py-2"
              label="Senha"
              readOnly
              type="password"
              value={user.tipoUsuario}
            />
          </div>
        </Card.Content>
        <Card.Actions className="w-full px-2 py-4">
          <Button className="flex-1">Editar Perfil</Button>
          <Button className="flex-1" variant="outlined">
            Deslogar
          </Button>
        </Card.Actions>
      </Card.Root>
    </div>
  );
}
