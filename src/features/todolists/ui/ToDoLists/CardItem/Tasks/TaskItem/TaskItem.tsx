import { EditebleTitle } from '@/commun/components'
import { TaskStatus } from '@/commun/enums/'
import { useAppDispatch } from '@/commun/hooks'
import type { DomainTask, ListType } from '@/features/todolists/api/'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import DeleteIcon from '@mui/icons-material/Delete'
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { memo, useCallback } from 'react'
import { updatingTask } from '@/features/todolists/utils'

type Props = {
    task: DomainTask
    idList: ListType['id']
}

const stylesButton = { padding: '0 0 0 5px' }
const stylesListItem = { padding: '3px' }

export const TaskItem = memo(({ task, idList }: Props) => {
    const dispatch = useAppDispatch()
    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()


    const updateTaskTitle = useCallback((title: DomainTask['title']) => {
        updatingTask(idList, task.id, true, dispatch)
        updateTask({ todolistId: idList, taskId: task.id, model: { ...task, title } }).finally(() => updatingTask(idList, task.id, false, dispatch))
    }, [idList, task.id])

    const deleteTaskHandler = useCallback(() => {
        updatingTask(idList, task.id, true, dispatch)
        deleteTask({ todolistId: idList, taskId: task.id }).finally(() => updatingTask(idList, task.id, false, dispatch))
    }, [idList, task.id])

    const updateTaskStatus = useCallback((checked: boolean) => {
        updatingTask(idList, task.id, true, dispatch)
        updateTask({
            todolistId: idList,
            taskId: task.id,
            model: {
                ...task,
                status: checked ? TaskStatus.Completed : TaskStatus.Active
            }
        }).finally(() => updatingTask(idList, task.id, false, dispatch))
    }, [idList, task.id])

    return (
        <>
            <ListItem
                sx={stylesListItem}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={deleteTaskHandler} disabled={task.updating}>
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
            <span>{new Date(task.addedDate).toLocaleDateString()}</span>
        </>


    )
})
