import { UserTable } from "@/components/usuario/userTable";

export default function UserAdmin() {
  return (
     <div className="p-4">
    
      <div className="bg-[#FFF7ED] min-h-screen p-6 relative">
    
      <div className="space-y-4">
        <UserTable/>
      </div>
    
        </div>
      </div>
    )
}
