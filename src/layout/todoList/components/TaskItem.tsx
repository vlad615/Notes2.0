import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { EditebleTitle } from "@/components/EditebleTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from "@/commun/hooks/useAppDispatch";
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, type TaskProps } from "@/model/task/tasks-reducer";
import type { ListType } from "@/model/list/todolists-reducer";

type Props = {
    task: TaskProps
    idList: ListType['id']
}

export const TaskItem = ({task, idList}: Props) => {
    const dispatch = useAppDispatch()

    function updateTaskTitle(title: TaskProps["title"]) {
        dispatch(changeTaskTitleAC({ todolistId: idList, taskId: task.id, title }))
    }

    function deleteTask() {
        dispatch(deleteTaskAC({ todolistId: idList, taskId: task.id }))
    }

    function updateTask() {
        dispatch(changeTaskStatusAC({ todolistId: idList, taskId: task.id }))
    }

    return (
        <ListItem sx={{ padding: '3px' }} key={task.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={deleteTask}>
                <DeleteIcon fontSize="small" />
            </IconButton>}>
            <ListItemButton sx={{ padding: '0 0 0 5px' }} onClick={updateTask} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={task.isDone}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <EditebleTitle title={task.title} setNewTitle={(title) => updateTaskTitle(title)} />
            </ListItemButton>
        </ListItem>
    )
}