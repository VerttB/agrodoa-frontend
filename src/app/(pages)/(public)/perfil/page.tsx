"use client";
import { capitalize } from "@/core/utils/capitalize";
import { useUserContext } from "@/providers/UserProvider";
import { UserCircle2Icon, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatTel } from "@/core/utils/formatTel";
import { formatCpfCnpj } from "@/core/utils/formatCpfCnpj";
import { StarRating } from "@/components/ui/StarRating";
import Image from "next/image";
import { imgValidate } from "@/core/utils/imageValidate";
export default function Perfil() {
  const { user } = useUserContext();
  if (!user) return <p>Usuário não encontrado</p>;
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card.Root className="min-w-[640px] border-gray-400 shadow-lg shadow-gray-500/50">
        <Card.Content className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="relative h-[140px] w-[140px] rounded-full">
              <Image className="object-cover rounded-full" fill alt="Foto do usuário" src={imgValidate(user.nomeArquivoFoto)}></Image>
            </div>
            <h1 className="text-2xl font-bold">{user?.nome}</h1>
            <p className="text-xl font-medium text-gray-700">
              {capitalize(user.tipoUsuario)}
            </p>
            <div className="mt-2 flex items-center gap-1">
              <StarRating nota={user.avaliacaoMedia}/>
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
              value={formatTel(user.telefone)}
            />
            <Input
              className="w-full py-2"
              label="Local"
              readOnly
              value={`${user.estado} - ${user.cidade}`}
            />
            <Input
              className="w-full py-2"
              label="CPF/CNPJ"
              readOnly
              value={formatCpfCnpj(user.cpfOuCnpj)}
            />
           
          </div>
        </Card.Content>
        <Card.Actions className="w-full flex-col px-2 py-4">
          <Button className="flex-1">Editar Perfil</Button>
          <Button className="flex-1" variant="outlined">
            Deslogar
          </Button>
        </Card.Actions>
      </Card.Root>
    </div>
  );
}
