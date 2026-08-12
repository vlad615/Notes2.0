import type { DomainTask } from '@/features/todolists/api'
import { memo, useCallback, useState } from 'react'
import { Button } from '../Button/Button'
import { AddItemS } from './AddItemS'

type Props = {
    createItem: (title: DomainTask['title']) => void
    label: string
    primary?: boolean
}

export const AddItem = memo(({ createItem, label, primary }: Props) => {
    // console.log('additem rerender');
    const [value, setValue] = useState('')

    function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    const variant = primary ? 'outlined' : 'standard'
    const newItem = useCallback(() => {
        if (value.trim().length !== 0) {
            createItem(value)
        }
        setValue('')
    }, [createItem, value])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') newItem()
    }


    return (
        <>
            <AddItemS
                type="text"
                value={value}
                onChange={changeValue}
                variant={variant}
                label={label}
                onKeyDown={(e) => handleKeyDown(e)}
                sx={style}
            />
            <Button name="Add" callBack={newItem} primary={primary} />
        </>
    )
})

const style = {
    borderRadius: '20px',
}