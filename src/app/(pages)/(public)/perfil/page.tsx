"use client"
import { useUserContext } from "@/providers/UserProvider";
import { UserCircle2Icon, Star } from "lucide-react";

export default function Perfil() {
  const { user } = useUserContext();
  if(!user) return(<p>e</p>)
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="bg-neutral rounded-xl">
        <div className="flex items-center">
          <UserCircle2Icon className="h-32 w-fit" />
          <div className="text-2xl">
            <p className="">{user?.nome}</p>
            <p>{(user?.tipo.charAt(0).toUpperCase() + user?.tipo.slice(1))}</p>
            <div className="flex">
              <Star color="yellow" />
              <Star color="yellow" />
              <Star color="yellow" />
              <Star color="yellow" />
              <Star color="yellow" />
            </div>
          </div>
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
