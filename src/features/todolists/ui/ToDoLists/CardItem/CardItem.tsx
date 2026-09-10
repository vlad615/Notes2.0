import { AddItem } from '@/commun/components/'
import { useAppDispatch } from '@/commun/hooks'
import type { DomainTask, ListType } from '@/features/todolists/api'
import { createTaskTC } from '@/features/todolists/model'
import { Box, Paper } from '@mui/material'
import { memo } from 'react'
import { CardHeader } from './CardHeader/CardHeader'
import s from './CardItem.module.css'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { Tasks } from './Tasks/Tasks'


export const CardItem = memo((list: ListType) => {
    const dispatch = useAppDispatch()

    const createTask = (title: DomainTask['title']) => {
        dispatch(createTaskTC({ todolistId: list.id, title }))
    }

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
