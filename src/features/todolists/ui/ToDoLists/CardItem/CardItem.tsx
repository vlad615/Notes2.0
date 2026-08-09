import { AddItem } from '@/commun/components/'
import { useAppDispatch } from '@/commun/hooks'
import type { DomainTask } from '@/features/todolists/api'
import { createTaskTC, type ListType } from '@/features/todolists/model'
import { Box, Paper } from '@mui/material'
import { memo, useCallback } from 'react'
import { CardHeader } from './CardHeader/CardHeader'
import s from './CardItem.module.css'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { Tasks } from './Tasks/Tasks'


export const CardItem = memo((list: ListType) => {
    const dispatch = useAppDispatch()

    const createTask = useCallback((title: DomainTask['title']) => {
        dispatch(createTaskTC({ todolistId: list.id, title }))
    }, [list.id, dispatch])

    console.log('CardItem rendered')
    return (
        <Paper className={s.wrapper} inert={list.entityStatus === 'loading'}>
            <CardHeader id={list.id} currentTitle={list.title} />
            <FilterButtons id={list.id} filter={list.filter} />
            <Tasks id={list.id} filter={list.filter} />
            <Box className={s.addWrapper}>
                <AddItem createItem={createTask} label="New task" />
            </Box>
        </Paper>
    )
})
