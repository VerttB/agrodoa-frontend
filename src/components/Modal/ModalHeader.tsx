interface ModalHeaderProps{
    title:string,
    children: React.ReactNode
}


export default function ModalHeader({title, children} : ModalHeaderProps){
    return(
        <div className="border-b-1">
            <h2>{title}</h2>
            {children}
        </div>
    )
}