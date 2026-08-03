import { memo } from 'react'
import { ButtonS } from './Buttons'

type Props = {
    name: string
    callBack?: () => void
    primary?: boolean
}

export const Button = memo(({ name, callBack, primary }: Props) => {
    const variant = primary ? 'contained' : 'outlined'
    return (
        <ButtonS variant={variant} type="button" onClick={callBack} sx={primary ? white : none}>
            {name}
        </ButtonS>
    )
})

const white = { color: '#fff' }
const none = { color: '' }