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
import { memo, useCallback } from 'react'

type Props = {
    task: DomainTask
    idList: ListType['id']
}

const stylesButton = { padding: '0 0 0 5px' }
const stylesListItem = { padding: '3px' }

export const TaskItem = memo(({ task, idList }: Props) => {
    console.log('taskitem render')
    const dispatch = useAppDispatch()

    const updateTaskTitle = useCallback((title: DomainTask['title']) => {
        dispatch(updateTaskTC({ todolistId: idList, taskId: task.id, domainModel: { title } }))
    }, [dispatch, idList, task.id])

    const deleteTask = useCallback(() => {
        dispatch(deleteTaskTC({ todolistId: idList, taskId: task.id }))
    }, [dispatch, idList, task.id])

    const updateTaskStatus = useCallback((checked: boolean) => {
        dispatch(updateTaskTC({
            todolistId: idList,
            taskId: task.id,
            domainModel: {
                status: checked ? TaskStatus.Completed : TaskStatus.Active
            }
        }))
    }, [dispatch, idList, task.id])

    return (
        <ListItem
            sx={stylesListItem}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteTask} disabled={task.updating}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            }>
            <ListItemButton sx={stylesButton} dense>
                <ListItemIcon>
                    <Checkbox edge="start" onChange={(e) => updateTaskStatus(e.target.checked)}
                        checked={task.status === TaskStatus.Completed} tabIndex={-1} disableRipple disabled={task.updating} />
                </ListItemIcon>
                <EditebleTitle title={task.title} setNewTitle={updateTaskTitle} />
            </ListItemButton>
        </ListItem>
    )
})
