import { useState } from "react"
import type { ListType } from "../layout/todoList/components/CardList";
import { TextField } from "@mui/material";

type Props = {
    title: string
    setNewTitle: (title: ListType["title"]) => void;
}


export const EditebleTitle = ({ title, setNewTitle }: Props) => {
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
            {isEdit ? <TextField autoFocus value={value} onKeyDown={(e) => setTitleEnter(e)} 
            onChange={changeValue} onBlur={setTitle} /> : title}
        </span>
    )
}