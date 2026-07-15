import { ButtonS } from './styles/Buttons';

type Props = {
    name: string
    callBack?: () => void
    primary?: boolean
}


export function Button({name, callBack, primary}: Props){
    const prim = primary? "contained" : "outlined"
    return(
        <ButtonS variant={prim} type="button" onClick={callBack} sx={primary? {color: "#fff"}: {color: ""}} >{name}</ButtonS>
    )
}