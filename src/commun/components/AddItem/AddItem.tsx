import { useState } from "react";
import { Button } from "../Button/Button";
import { AddItemS } from "./AddItemS";
import type { TaskProps } from "@/features/todolists/model/tasks-reducer";

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
            <AddItemS type="text" value={value} onChange={changeValue} variant={prim} label={label} sx={{borderRadius: '20px'}}/>
            <Button name="Add" callBack={newItem} primary={primary} />
        </>
    )
}