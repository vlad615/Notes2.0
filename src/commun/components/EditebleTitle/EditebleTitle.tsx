import type { ListType } from '@/features/todolists/model'
import { TextField } from '@mui/material'
import { memo, useState } from 'react'

type Props = {
    title: string
    setNewTitle: (title: ListType['title']) => void
}

export const EditebleTitle = memo(({ title, setNewTitle }: Props) => {
    // console.log('editebletitle render');

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [value, setValue] = useState(title)


    function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    function setTitle() {
        setIsEdit(false)
        setNewTitle(value)
    }

    function setTitleEnter(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            setIsEdit(false)
            setNewTitle(value)
        }
    }

    return (
        <span onDoubleClick={() => setIsEdit(true)}>
            {isEdit ? (
                <TextField
                    autoFocus
                    value={value}
                    onKeyDown={(e) => setTitleEnter(e)}
                    onChange={changeValue}
                    onBlur={setTitle}
                />
            ) : (
                title
            )}
        </span>
    )
})
