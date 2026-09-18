import { AddItem } from '@/commun/components/'
import { useCreateTaskMutation, type DomainTask, type ListType } from '@/features/todolists/api'
import { Box, Paper } from '@mui/material'
import { memo } from 'react'
import { CardHeader } from './CardHeader/'
import s from './CardItem.module.css'
import { FilterButtons } from './FilterButtons/'
import { Tasks } from './Tasks/'


export const CardItem = memo((list: ListType) => {
    const [createTask] = useCreateTaskMutation()

    const createTaskHandler = (title: DomainTask['title']) => {
        createTask({ todolistId: list.id, title: title })
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
