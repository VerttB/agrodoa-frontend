interface ModalActionsProps{
    className?:string,
    children: React.ReactNode
}

export const  ModalActions = ({className,children} : ModalActionsProps) => {
    return(
        <div className={`flex gap-4 w-full p-2 ${className}`}>
            {children}
        </div>
    )
}