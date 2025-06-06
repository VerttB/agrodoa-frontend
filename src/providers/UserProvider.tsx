"use client";

import { IUser } from "@/core/interfaces/IUser";
import { createContext, useState, useContext } from "react";

type UserContextType = {
  user: IUser | null;
  applyUser: (u: IUser) => void;
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
  const [user, setUser] = useState<IUser | null>(null);

  const applyUser = (u: IUser) => {
    setUser(u);
  };

  return (
    <userContext.Provider value={{ user, applyUser }}>
      {children}
    </userContext.Provider>
  );
}
