import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";

interface Estado {
  id: string;
  nome: string;
}

interface Cidade {
  id: string;
  nome: string;
}

export function useEstadosECidades() {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);

  const { data: estadosData } = useFetch<Estado[]>(
    "http://localhost:8080/estados",
  );
  const { data: cidadesData } = useFetch<Cidade[]>(
    estadoSelecionado
      ? `http://localhost:8080/estados/${estadoSelecionado}/cidades`
      : "",
  );

  useEffect(() => {
    if (estadosData?.length) {
      setEstados(estadosData);
      setEstadoSelecionado(estadosData[0].id);
    }
  }, [estadosData]);

  useEffect(() => {
    if (cidadesData) {
      setCidades(cidadesData);
    } else {
      setCidades([]);
    }
  }, [cidadesData]);

  return {
    estados,
    cidades,
    estadoSelecionado,
    setEstadoSelecionado,
  };
}
