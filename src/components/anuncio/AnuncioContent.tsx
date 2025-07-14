'use client'

import { useUserContext } from "@/providers/UserProvider"
import { AnuncioFiltros } from "./AnuncioFiltros"
import AnuncioSearch from "./AnuncioSearch"
import { AnuncioTabs } from "./AnuncioTabs"
import { CriarAnuncio } from "./CriarAnuncioModal"
import { AnuncioTabsContent } from "./AnuncioTabsContent"
import { Anuncio } from "@/core/interfaces/Anuncio"
import { useEffect, useState } from "react"
import { getAnunciosEmNegociacao, getAnunciosSalvos } from "@/core/services/AnuncioService"

export const AnuncioContent = ({ anuncios }: { anuncios: Anuncio[] }) => {
  const { user } = useUserContext()
  const isLogged = !!user
  const isFornecedor = user?.tipoUsuario === "fornecedor"
  const [tab, setTab] = useState("disponiveis")
  const [anunciosPorAba, setAnunciosPorAba] = useState<Partial<Record<string, Anuncio[]>>>({
    disponiveis: anuncios,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLogged) {
      setAnunciosPorAba({ disponiveis: anuncios })
      setTab("disponiveis")
      return
    }

    async function loadData() {
      setLoading(true)
      try {
        if (user!.tipoUsuario === "beneficiario") {
          const salvos = await getAnunciosSalvos()
          const negociacao = await getAnunciosEmNegociacao() // Se tiver, busque aqui
          setAnunciosPorAba({ disponiveis: anuncios, salvos, negociacao })
          setTab("disponiveis")
        } else {
          const abertos = anuncios.filter(a => a.anunciante.nome === user?.nome) 
          const finalizados: Anuncio[] = [] // Buscar finalizados
          setAnunciosPorAba({ abertos, finalizados })
          setTab("abertos")
        }
      } catch (e) {
        console.error("Erro carregando anúncios:", e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user, anuncios, isLogged])

  if (loading) return <div>Carregando anúncios...</div>

  return (
    <AnuncioTabs
      tipoUsuario={user?.tipoUsuario || null}
      onTabChange={setTab}
      value={isLogged ? undefined : "disponiveis"}
    >
      <div className="flex flex-col gap-4">
        {user?.tipoUsuario === "beneficiario" && tab === "disponiveis" && (
          <div className="flex gap-2">
            <AnuncioFiltros />
            <AnuncioSearch />
          </div>
        )}

        {isFornecedor && <CriarAnuncio />}

        <AnuncioTabsContent anunciosPorAba={anunciosPorAba} tipoUsuario={user?.tipoUsuario || null} />
      </div>
    </AnuncioTabs>
  )
}
