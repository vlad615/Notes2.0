import type { ListType } from '@/features/todolists/api'
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { memo, useCallback, useRef, useState } from 'react'

type Props = TextFieldProps & {
    title: string
    maxLength?: number
    setNewTitle: (title: ListType['title']) => void
}

const MIN_LENGTH = 3

export const EditebleTitle = memo(({ title, setNewTitle, maxLength = 30, disabled }: Props) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)


    const clearError = useCallback(() => {
        setIsEdit(false)
        setError('')
    }, [])

    const newItem = useCallback(() => {
        const value = inputRef.current?.value ?? ''
        const trimmedValue = value.trim()

        if (trimmedValue.length < MIN_LENGTH || trimmedValue.length > maxLength) {
            setError(`Длина не должна быть меньше 3 и больше ${maxLength} симовлов.`)
            return
        }

        setNewTitle(trimmedValue)
        setIsEdit(false)
        setError('')

        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [setNewTitle, maxLength])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            newItem()
        }
    }


    return (
        <span onDoubleClick={() => setIsEdit(true)} style={{ pointerEvents: disabled ? 'none' : 'auto', cursor: 'text' }}>
            {isEdit ? (
                <TextField
                    inputRef={inputRef}
                    defaultValue={title}
                    autoFocus
                    onKeyDown={(e) => handleKeyDown(e)}
                    onBlur={clearError}
                    error={Boolean(error)}
                    helperText={error}
                />
            ) : (
                title
            )}
        </span>
    )
})
