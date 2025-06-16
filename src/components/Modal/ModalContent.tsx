
interface ModalContentProps{
    children: React.ReactNode,
    className?: string,
}

export const ModalContent = ({children, className} : ModalContentProps) => {
    return(
        <div className={`flex flex-col p-6 gap-4 ${className}`}>
            {children}
        </div>
    )
}