import { useAppSelector } from '@/commun/hooks'
import { type ListType, type TaskProps, selectTasks } from '@/features/todolists/model'
import { List } from '@mui/material'
import { TaskItem } from './TaskItem/TaskItem'

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

export const Tasks = ({ id, filter }: Props) => {
    const tasks = useAppSelector(selectTasks)

    let filteredTasks: TaskProps[] | string = tasks[id]

    if (filter === 'active') {
        filteredTasks = tasks[id].filter((t) => !t.isDone)
        if (!filteredTasks.length) {
            filteredTasks = 'All tasks is done!'
        }
    } else if (filter === 'completed') {
        filteredTasks = tasks[id].filter((t) => t.isDone)
        if (!filteredTasks.length) {
            filteredTasks = 'U have complite no tasks, yet!'
        }
    }

    return (
        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 260 }}>
            {!tasks[id].length ? (
                <span>List is empty</span>
            ) : Array.isArray(filteredTasks) ? (
                filteredTasks.map((task) => <TaskItem key={task.id} idList={id} task={task} />)
            ) : (
                <span>{filteredTasks}</span>
            )}
        </List>
    )
}
