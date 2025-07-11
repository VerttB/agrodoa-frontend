import { UserTable } from "@/components/usuario/userTable";
import { getUsuarios } from "@/core/services/UserService";

export default async function Admin(){
    const usuarios = await getUsuarios()
    return(
        <UserTable usuario={usuarios}/>
    )
}