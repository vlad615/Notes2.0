import { Box, Paper } from "@mui/material"
import { AddItem } from "@/components/AddItem"
import s from "./Form.module.css"
import { type ListType, createTodolistAC } from "@/model/list/todolists-reducer"
import { useAppDispatch } from "@/commun/hooks/useAppDispatch"

export const Form = () => {
    const dispatch = useAppDispatch()

    function createList(title: ListType["title"]) {
        dispatch(createTodolistAC(title))
    }

    return (
        <Paper className={s.wrapper}>
            <h2 className={s.title}>Add a new to-do list</h2>
            <Box className={s.inputsWrapper}>
                <AddItem createItem={createList} label="Name of List..." primary />
            </Box>

        </Paper>
    )
}