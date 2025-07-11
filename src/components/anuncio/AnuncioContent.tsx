'use client'

import { useUserContext } from "@/providers/UserProvider"
import { AnuncioFiltros } from "./AnuncioFiltros"
import AnuncioSearch from "./AnuncioSearch"
import { AnuncioTabs } from "./AnuncioTabs"
import { CriarAnuncio } from "./CriarAnuncioModal"
import { AnuncioTabsContent } from "./AnuncioTabsContent"
import { Anuncio } from "@/core/interfaces/Anuncio"

export const AnuncioContent = ({anuncios}:{anuncios: Anuncio[]}) => {
    const { user } = useUserContext();
    return(
         <AnuncioTabs tipoUsuario={user?.tipo || null}>
          <div className="flex flex-col">
            <div className="flex">
            <AnuncioFiltros/>
            <AnuncioSearch/>
            </div>
            {user?.tipo === "fornecedor" && <CriarAnuncio />}
           <AnuncioTabsContent anuncios={anuncios} tipoUsuario={user?.tipo || null}/>
          </div>
        </AnuncioTabs>
    )
}