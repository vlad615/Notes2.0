import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { fetchTodolistsTC, selectLists } from '@/features/todolists/model'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { CardItem } from './CardItem/CardItem'
import { Form } from './Form/Form'
import s from './ToDoLists.module.css'

export const ToDoLists = () => {
    const lists = useAppSelector(selectLists)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <Form />
                    <Box className={s.tasksWrapper}>
                        {lists.map((list) => (
                            <CardItem key={list.id} {...list} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
