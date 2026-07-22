import { Box, Paper } from "@mui/material"
import { AddItem } from "@/commun/components"
import s from "./Form.module.css"
import { type ListType, createTodolistAC } from "@/features/todolists/model"
import { useAppDispatch } from "@/commun/hooks"

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