import { EditebleTitle } from '@/commun/components'
import { TaskStatus } from '@/commun/enums/'
import type { DomainTask, ListType } from '@/features/todolists/api/'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import DeleteIcon from '@mui/icons-material/Delete'
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { memo, useCallback } from 'react'

type Props = {
    task: DomainTask
    idList: ListType['id']
}

const stylesButton = { padding: '0 0 0 5px' }
const stylesListItem = { padding: '3px' }

export const TaskItem = memo(({ task, idList }: Props) => {
    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()


    const updateTaskTitle = useCallback((title: DomainTask['title']) => {
        updateTask({ todolistId: idList, taskId: task.id, model: { ...task, title } })
    }, [idList, task.id])

    const deleteTaskHandler = useCallback(() => {
        deleteTask({ todolistId: idList, taskId: task.id })
    }, [idList, task.id])

    const updateTaskStatus = useCallback((checked: boolean) => {
        updateTask({
            todolistId: idList,
            taskId: task.id,
            model: {
                ...task,
                status: checked ? TaskStatus.Completed : TaskStatus.Active
            }
        })
    }, [idList, task.id])

    return (
        <>
            <ListItem
                sx={stylesListItem}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={deleteTaskHandler}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                }>
                <ListItemButton sx={stylesButton} dense>
                    <ListItemIcon>
                        <Checkbox edge="start" onChange={(e) => updateTaskStatus(e.target.checked)}
                            checked={task.status === TaskStatus.Completed} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <EditebleTitle title={task.title} setNewTitle={updateTaskTitle} />
                </ListItemButton>
            </ListItem>
            <span>{new Date(task.addedDate).toLocaleDateString()}</span>
        </>


    )
})
