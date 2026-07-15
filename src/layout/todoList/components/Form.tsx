import { Box, Paper } from "@mui/material"
import { AddItem } from "../../../components/AddItem"
import s from "./Form.module.css"
import type { ListType } from "../../../model/list/todolists-reducer"

type Props = {
    createList: (title: ListType["title"]) => void
}

export const Form = ({ createList }: Props) => {

    return (
        <Paper className={s.wrapper}>
            <h2 className={s.title}>Add a new to-do list</h2>
            <Box className={s.inputsWrapper}>
                <AddItem createItem={createList} label="Name of List..." primary />
            </Box>

        </Paper>
    )
}