import { useAppDispatch, useAppSelector } from '@/commun/hooks'
import { fetchTasksTC, type ListType, selectTasks } from '@/features/todolists/model'
import { List } from '@mui/material'
import { TaskItem } from './TaskItem/TaskItem'
import type { DomainTask } from '@/features/todolists/api'
import { TaskStatus } from '@/commun/enums'
import { memo, useEffect } from 'react'
import { idID } from '@mui/material/locale'

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

export const Tasks = memo(({ id, filter }: Props) => {
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        // const asyncAction = fetchTasksTC(id)
        dispatch(fetchTasksTC(id))
    }, [])

    let filteredTasks: DomainTask[] | string = tasks[id]

    if (filter === 'active') {
        filteredTasks = tasks[id].filter((t) => t.status === TaskStatus.Active)
        if (!filteredTasks.length) {
            filteredTasks = 'All tasks is done!'
        }
    } else if (filter === 'completed') {
        filteredTasks = tasks[id].filter((t) => t.status === TaskStatus.Completed)
        if (!filteredTasks.length) {
            filteredTasks = 'U have complite no tasks, yet!'
        }
    }
    return (
        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 260 }}>
            {!tasks[id]?.length ? (
                <span>List is empty</span>
            ) : Array.isArray(filteredTasks) ? (
                filteredTasks.map((task) => <TaskItem key={task.id} idList={id} task={task} />)
            ) : (
                <span>{filteredTasks}</span>
            )}
        </List>
    )
})
