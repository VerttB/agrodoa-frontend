'use client'

import { User } from "@/interfaces/IUser";
import { createContext, useState, useContext } from "react";

// Tipo correto do contexto
type UserContextType = {
  user: User | null;
  applyUser: (u: User) => void;
};

export const userContext = createContext<UserContextType | null>(null);
export function useUserContext() {
  const context = useContext(userContext);
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
  const [user, setUser] = useState<User | null>(null);

  const applyUser = (u: User) => {
    setUser(u); 
  };

  return (
    <userContext.Provider value={{ user, applyUser }}>
      {children}
    </userContext.Provider>
  );
}
