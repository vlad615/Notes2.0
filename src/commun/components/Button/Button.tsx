import { memo } from 'react'
import { Button as MuiButton } from '@mui/material';
import { type ButtonProps } from '@mui/material/Button';
import { Link } from 'react-router';

type Props = ButtonProps & {
    name: string
    callBack?: () => void
    to?: string
    primary?: boolean
}

export const Button = memo(({ name, callBack, primary, to }: Props) => {
    const variant = primary ? 'contained' : 'outlined'
    return (
        <>
            <MuiButton component={to ? Link : MuiButton} to={to ?? ''} variant={variant} type="button" onClick={callBack} sx={primary ? white : none}>
                {name}
            </MuiButton>
        </>

    )
})

const white = { color: '#fff' }
const none = { color: '' }