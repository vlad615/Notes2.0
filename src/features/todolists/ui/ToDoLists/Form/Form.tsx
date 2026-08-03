import { Box, Paper } from '@mui/material'
import { AddItem } from '@/commun/components'
import s from './Form.module.css'
import { type ListType, createTodolistTC } from '@/features/todolists/model'
import { useAppDispatch } from '@/commun/hooks'
import { memo, useCallback } from 'react'

export const Form = memo(() => {
    const dispatch = useAppDispatch()

    const createList = useCallback((title: ListType['title']) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    console.log('render form');

    return (
        <Paper className={s.wrapper}>
            <h2 className={s.title}>Add a new to-do list</h2>
            <Box className={s.inputsWrapper}>
                <AddItem createItem={createList} label="Name of List..." primary />
            </Box>
        </Paper>
    )
})
