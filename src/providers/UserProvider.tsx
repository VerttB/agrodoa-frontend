"use client";

import { Usuario } from "@/core/interfaces/Usuario";
import { cadastroUsuario, deslogar, loginUsuario, verPerfil } from "@/core/services/UserService";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

type UserContextType = {
  user: Usuario | null,
  isLoading: boolean,
  isAuthenticated: boolean,
  login: (email:string, senha:string) => Promise<boolean>,
  logout: () => void,
  cadastro: (data: any) => Promise<boolean>
};

export const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try{
          const userData = await verPerfil();
          setUser(userData)
      }catch(e){
          console.warn("Nenhum perfil ativo", e);
          setUser(null);
      } finally{
        setIsLoading(false);
      }
  }
  loadUser()
  },[])

  const login = async (email: string, senha: string):Promise<boolean> => {
     setIsLoading(true); 
    try {
      const userData = await loginUsuario(email, senha); 
      setUser(userData); 
      return true; 
    } catch (error) {
      console.error("Erro no login:", error);
      setUser(null); 
      return false; 
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);

    try{
      deslogar();
      setUser(null)
      router.push("/");
    }catch(e){
      console.error("Erro ao deslogar", e)
    }finally{
      setIsLoading(false);
    }
  };

  const cadastro = async (data:any):Promise<boolean> => {
    setIsLoading(true);
    try{
      const userData = await cadastroUsuario(data)
      setUser(userData)
      return true;
    }catch(e){
      console.error("Erro no cadastro", e);
      return false;
    }finally{
      setIsLoading(false);
    }
  }

  const contextValue = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    cadastro
  }
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
