import { EditebleTitle } from '@/commun/components'
import { TaskStatus } from '@/commun/enums/'
import type { DomainTask, ListType } from '@/features/todolists/api/'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import { useSortable } from '@dnd-kit/react/sortable'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon } from '@mui/material'
import { memo, useCallback } from 'react'


type Props = {
    task: DomainTask
    idList: ListType['id']
    index: number
}

export const TaskItem = memo(({ idList, task, index }: Props) => {
    const { ref } = useSortable({ id: task.id, index });
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
        <Box ref={ref}>
            <ListItem
                sx={item_styles}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={deleteTaskHandler}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                }>
                <ListItemButton sx={btn_styles} dense>
                    <ListItemIcon>
                        <Checkbox edge="start" onChange={(e) => updateTaskStatus(e.target.checked)}
                            checked={task.status === TaskStatus.Completed} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <EditebleTitle title={task.title} setNewTitle={updateTaskTitle} />
                </ListItemButton>
            </ListItem>
            <span>{new Date(task.addedDate).toLocaleDateString()}</span>
        </Box>
    )
})


const btn_styles = { cursor: 'grab', padding: 'unset' }
const item_styles = { padding: 'unset' }