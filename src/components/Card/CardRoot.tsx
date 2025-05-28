
interface CardRootProps{
    children: React.ReactNode
    className?: string
}

export const CardRoot: React.FC<CardRootProps> = ( {children, className} : CardRootProps) => {
    return(
        <div className= {`shadow rounded-md bg-neutral ${className} `}>
            {children}
        </div>
    )
}