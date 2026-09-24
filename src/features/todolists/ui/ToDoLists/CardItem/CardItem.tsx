import { AddItem } from '@/commun/components/'
import { useCreateTaskMutation, type DomainTask, type ListType } from '@/features/todolists/api'
import { Box, Paper } from '@mui/material'
import { memo } from 'react'
import { CardHeader } from './CardHeader/'
import s from './CardItem.module.css'
import { FilterButtons } from './FilterButtons/'
import { Tasks } from './Tasks/'
import { useSortable } from '@dnd-kit/react/sortable'

type Props = {
    list: ListType
    index: number
}

export const CardItem = memo(({ list, index }: Props) => {
    const { ref } = useSortable({ id: list.id, index });

    const [createTask] = useCreateTaskMutation()

    const createTaskHandler = (title: DomainTask['title']) => {
        createTask({ todolistId: list.id, title: title })
    }

    return (
        <Paper className={s.wrapper} ref={ref}>
            <CardHeader id={list.id} currentTitle={list.title} />
            <FilterButtons id={list.id} filter={list.filter} />
            <Tasks id={list.id} filter={list.filter} />
            <Box className={s.addWrapper}>
                <AddItem createItem={createTaskHandler} label="New task" />
            </Box>
        </Paper>
    )
})
