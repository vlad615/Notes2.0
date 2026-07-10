import { useState } from "react";
import type { TaskProps } from "../layout/todoList/components/CardList";
import { Button } from "./Buttons";
import { AddItemS } from "./styles/AddItemS";

type Props = {
    createItem: (title: TaskProps["title"]) => void;
    label: string
    primary?: boolean
}

export const AddItem = ({ createItem, label, primary }: Props) => {
    const [value, setValue] = useState("")

    function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }
    const prim = primary ? "outlined" : "standard"
    function newItem() {
        if (value.trim().length !== 0) {
            createItem(value)
        }
        setValue("")
    }
    return (
        <>
            <AddItemS type="text" value={value} onChange={changeValue} variant={prim} label={label} />
            <Button name="Add" callBack={newItem} primary={primary} />
        </>
    )
}