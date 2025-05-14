
interface ButtonProps{
    text: string,
    onClick?: () => void,
    type?: "primary" | "outlined",
    className?: string
}

export default function Button({type = "primary", text, onClick, className}:ButtonProps){
    const primary = "bg-accent font-white hover:bg-accent-hover"
    const outlined = "bg-white b-1 border-accent border-solid"

    return(
    <button className={`rounded-md cursor-pointer ${className} ${(type == "primary" ? primary : outlined)}`} onClick={onClick}>
        {text}
    </button>
    );
}