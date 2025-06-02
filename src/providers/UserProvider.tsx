'use client'
import { User } from "@/interfaces/IUser";
import {  createContext, useState } from "react";

const userContext = createContext<User | null>(null);

export default function UserProvider(children : React.ReactNode){

    const [user, setUser] = useState<User | null>(null);

    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}