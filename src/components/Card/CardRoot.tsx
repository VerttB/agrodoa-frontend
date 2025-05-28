
interface CardRootProps{
    children: React.ReactNode
    className?: string
}

export const CardRoot: React.FC<CardRootProps> = ( {children, className} : CardRootProps) => {
    return(
        <div className= {`shadow rounded-md bg-neutral border-gray-300 border-1  ${className} `}>
            {children}
        </div>
    )
}