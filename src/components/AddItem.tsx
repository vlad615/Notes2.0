import { useState } from "react";
import type { TaskProps } from "../layout/todoList/components/CardList";
import { Button } from "./Buttons";
import s from "./AddItem.module.css"

type Props = {
    createItem: (title: TaskProps["title"])=>void;
}

export const AddItem = ({createItem}: Props) => {
    const [value, setValue] = useState("")

    function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    function newItem() {
        if (value.trim().length !== 0) {
            createItem(value)
        }
        setValue("")
    }
    return (
        <div>
            <input type="text" value={value} onChange={changeValue} className={s.input}/><Button name="Add" callBack={newItem}/>
        </div>
    )
}