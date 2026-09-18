import { useGetTodolistsQuery } from '@/features/todolists/api'
import { Box } from '@mui/material'
import { CardItem } from './CardItem/'
import { Form } from './Form/'
import { TodoSkeleton } from './TodoSkeleton'
import s from './ToDoLists.module.css'
import { Fragment } from 'react/jsx-runtime'

export const ToDoLists = () => {
    const { data, isLoading } = useGetTodolistsQuery()

    if (isLoading) {
        return(
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.tasksWrapper}>
                    {Array(3).fill(null).map((_, id) => (
                        <TodoSkeleton key={id} />
                    ))}
                </Box>
            </Box>
        </Box>
        )
    }

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <Form />
                    <Box className={s.tasksWrapper}>
                        {data?.map((list) => (
                            <Fragment key={list.id}>
                                <CardItem {...list} />
                            </Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
