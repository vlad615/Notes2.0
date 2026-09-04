import { memo } from 'react'
import { ButtonS } from './Buttons'
import { type ButtonProps } from '@mui/material/Button';

type Props = ButtonProps & {
    name: string
    callBack?: () => void
    primary?: boolean
}

export const Button = memo(({ name, callBack, primary, href }: Props) => {
    // console.log('button render');

    const variant = primary ? 'contained' : 'outlined'
    return (
        <ButtonS href={href} variant={variant} type="button" onClick={callBack} sx={primary ? white : none}>
            {name}
        </ButtonS>
    )
})

const white = { color: '#fff' }
const none = { color: '' }