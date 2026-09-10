import { useGetTodolistsQuery } from '@/features/todolists/api'
import { Box } from '@mui/material'
import { CardItem } from './CardItem/CardItem'
import { Form } from './Form/Form'
import s from './ToDoLists.module.css'

export const ToDoLists = () => {
    const { data } = useGetTodolistsQuery()

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <Form />
                    <Box className={s.tasksWrapper}>
                        {data?.map((list) => (
                            <CardItem key={list.id} {...list} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
