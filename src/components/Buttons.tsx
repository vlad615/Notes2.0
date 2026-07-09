import s from "./Buttons.module.css"

type Props = {
    name: string
    callBack?: () => void
    primary?: boolean
}

export function Button({name, callBack, primary}: Props){
    return(
        <button type="button" onClick={callBack} className={primary? s.primary: ""}>{name}</button>
    )
}