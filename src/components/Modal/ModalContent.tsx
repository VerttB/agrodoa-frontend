
interface ModalContentProps{
    children: React.ReactNode
}

export default function ModalContent({children} : ModalContentProps){
    return(
        <div className="p-2">
            {children}
        </div>
    )
}