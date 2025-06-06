interface ModalActionsProps{
    className?:string,
    children: React.ReactNode
}

export default function ModalActions({className,children} : ModalActionsProps){
    return(
        <div className={`flex ${className}`}>
            {children}
        </div>
    )
}