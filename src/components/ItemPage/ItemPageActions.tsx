interface ItemPageActionsProps  {
    children: React.ReactNode
}

export const ItemPageActions = ({children} : ItemPageActionsProps) => {
    return(
        <div className="flex w-full flex-col gap-4 p-4 md:w-3/4">
            {children}
        </div>
    )
}