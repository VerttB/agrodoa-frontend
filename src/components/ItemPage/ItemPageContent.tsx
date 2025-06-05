interface ItemPageContentProps  {
    children: React.ReactNode
}

export const ItemPageContent = ({children} : ItemPageContentProps) => {
    return(
        <div className="flex flex-col gap-4 p-4 md:flex-row">
            {children}
        </div>
    )
}