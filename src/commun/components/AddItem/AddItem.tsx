import { memo, useCallback, useRef, useState } from 'react'
import { Button } from '../Button/Button'
import TextField, { type TextFieldProps } from '@mui/material/TextField';

const style = {
    maxWidth: '380px',
    width: '100%',
    marginRight: '15px',
    borderRadius: '20px',
}

type Props = TextFieldProps & {
    createItem: (title: string) => void
    primary?: boolean
    maxLength?: number
}

const MIN_LENGTH = 3

export const AddItem = memo(({ createItem, label, primary, maxLength = 30 }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')

    const clearError = useCallback(() => {
        setError('')
    }, [])

    const newItem = useCallback(() => {
        const value = inputRef.current?.value ?? ''
        const trimmedValue = value.trim()

        if (trimmedValue.length < MIN_LENGTH || trimmedValue.length > maxLength) {
            setError(`Длина не должна быть меньше 3 и больше ${maxLength} симовлов.`)
            return
        }

        createItem(trimmedValue)
        setError('')

        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [createItem, maxLength])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            newItem()
        }
    }

    return (
        <>
            <TextField
                inputRef={inputRef}
                type="text"
                variant={primary ? 'outlined' : 'standard'}
                label={label}
                onKeyDown={handleKeyDown}
                onBlur={clearError}
                sx={style}
                error={Boolean(error)}
                helperText={error}
            />
            <Button name="Add" callBack={newItem} primary={primary} />
        </>
    )
})

