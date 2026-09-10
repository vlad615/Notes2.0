import { AddItem } from '@/commun/components'
import { useAddTodolistMutation } from '@/features/todolists/api'
import { Box, Paper } from '@mui/material'
import s from './Form.module.css'

export const Form = () => {
    const [trigger, { data, error, isLoading }] = useAddTodolistMutation()

    function createList(title: string) {
        trigger(title)
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
