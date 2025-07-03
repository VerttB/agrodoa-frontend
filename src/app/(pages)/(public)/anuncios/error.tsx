"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error(){
    const router = useRouter();
    return(
        <div className="min-h-screen w-full bg-primary flex justify-center items-center">

            <div className=" w-1/4 h-96 flex flex-col gap-12 justify-center items-center px-4 py-8 rounded-2xl bg-white text-black shadow-2xl">
            <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-3xl text-center">Erro ao conectar com o servidor de dados</h1>
                    <p>Não foi possível conectar ao servidor do AgroDoa.
                    Verifique sua conexão ou tente novamente mais tarde. </p>
                    </div>
                    <Button 
                        className="text-xl w-1/2"
                        onClick={() => router.refresh()}>Tentar Novamente</Button>
            </div>
        </div>
    )
}