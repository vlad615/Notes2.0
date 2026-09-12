import { AddItem } from '@/commun/components/'
import type { DomainTask, ListType } from '@/features/todolists/api'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi'
import { Box, Paper } from '@mui/material'
import { memo } from 'react'
import { CardHeader } from './CardHeader/CardHeader'
import s from './CardItem.module.css'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { Tasks } from './Tasks/Tasks'


export const CardItem = memo((list: ListType) => {
    const [createTask] = useCreateTaskMutation()

    const createTaskHandler = (title: DomainTask['title']) => {
        createTask({ todolistId: list.id, title })
    }

    return (
        <Paper className={s.wrapper} inert={list.entityStatus === 'loading'}>
            <CardHeader id={list.id} currentTitle={list.title} />
            <FilterButtons id={list.id} filter={list.filter} />
            <Tasks id={list.id} filter={list.filter} />
            <Box className={s.addWrapper}>
                <AddItem createItem={createTaskHandler} label="New task" />
            </Box>
        </Paper>
    )
})
