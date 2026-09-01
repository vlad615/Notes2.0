import { TaskStatus } from '@/commun/enums'
import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import type { DomainTask } from '@/features/todolists/api'
import { fetchTasksTC, type ListType, selectTasks } from '@/features/todolists/model'
import { List } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { TaskItem } from './TaskItem/TaskItem'

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

const styleTasks = { width: '100%', overflow: 'auto', maxHeight: 260 }


export const Tasks = ({ id, filter }: Props) => {
    const tasks = useAppSelector((state) => selectTasks(state)[id])

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id])

    const filteredTasks = useMemo<DomainTask[] | string>(() => {
        if (filter === 'active') {
            const activeTasks = tasks.filter((t) => t.status === TaskStatus.Active)
            return activeTasks.length ? activeTasks : 'All tasks is done!'
        }

        if (filter === 'completed') {
            const completedTasks = tasks.filter((t) => t.status === TaskStatus.Completed)
            return completedTasks.length ? completedTasks : 'U have complite no tasks, yet!'
        }

        return tasks
    }, [filter, tasks])


    return (
        <List sx={styleTasks}>
            {!tasks?.length ? (
                <span>List is empty</span>
            ) : Array.isArray(filteredTasks) ? (
                filteredTasks.map((task) => <TaskItem key={task.id} idList={id} task={task} />)
            ) : (
                <span>{filteredTasks}</span>
            )}
        </List>
    )
}
