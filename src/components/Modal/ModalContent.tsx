
interface ModalContentProps{
    children: React.ReactNode
}

export const ModalContent = ({children} : ModalContentProps) => {
    return(
        <div className="flex flex-col p-4 gap-4">
            {children}
        </div>
    )
}