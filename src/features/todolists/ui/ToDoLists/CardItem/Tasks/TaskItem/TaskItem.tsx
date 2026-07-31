import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { EditebleTitle } from '@/commun/components'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '@/commun/hooks'
import {
    updateTaskTC,
    deleteTaskTC,
    type ListType,
} from '@/features/todolists/model'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskStatus } from '@/commun/enums/'
import { memo } from 'react'

type Props = {
    task: DomainTask
    idList: ListType['id']
}

export const TaskItem = memo(({ task, idList }: Props) => {
    const dispatch = useAppDispatch()

    function updateTaskTitle(title: DomainTask['title']) {
        dispatch(updateTaskTC({ todolistId: idList, taskId: task.id, domainModel: { title } }))
    }

    function deleteTask() {
        dispatch(deleteTaskTC({ todolistId: idList, taskId: task.id }))
    }

    function updateTaskStatus(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(updateTaskTC({
            todolistId: idList,
            taskId: task.id,
            domainModel: {
                status: event.target.checked ? TaskStatus.Completed : TaskStatus.Active
            }
        }))
    }

    return (
        <ListItem
            sx={{ padding: '3px' }}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            }>
            <ListItemButton sx={{ padding: '0 0 0 5px' }} dense>
                <ListItemIcon>
                    <Checkbox edge="start" onChange={(event) => updateTaskStatus(event)}
                        checked={task.status === TaskStatus.Completed} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <EditebleTitle title={task.title} setNewTitle={(title) => updateTaskTitle(title)} />
            </ListItemButton>
        </ListItem>
    )
})
