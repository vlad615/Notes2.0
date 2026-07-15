import { useAppDispatch } from "@/commun/hooks/useAppDispatch";
import { useAppSelector } from "@/commun/hooks/useAppSelector";
import { EditebleTitle } from "@/components/EditebleTitle";
import type { ListType } from "@/model/list/todolists-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, type TaskProps } from "@/model/task/tasks-reducer";
import { selectTasks } from "@/model/task/tasks-selector";
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";

type Props = {
    id: ListType['id']
    filter: ListType['filter']
}

export const Tasks = ({ id, filter }: Props) => {
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    function ListItems() {
        let filteredTasks: TaskProps[] = [];

        if (filter === "active") {
            filteredTasks = tasks[id].filter(t => !t.isDone)
            if (!filteredTasks.length) {
                return <span>All tasks is done!</span>
            }
        } else if (filter === "completed") {
            filteredTasks = tasks[id].filter(t => t.isDone)
            if (!filteredTasks.length) {
                return <span>U have complite no tasks, yet!</span>
            }
        }

        const item = (data: TaskProps) =>
            <ListItem sx={{ padding: '3px' }} key={data.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(id, data.id)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>}>
                <ListItemButton sx={{ padding: '0 0 0 5px' }} onClick={() => updateTask(id, data.id)} dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={data.isDone}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <EditebleTitle title={data.title} setNewTitle={(title: TaskProps["title"]) => updateTaskTitle(id, data.id, title)} />
                </ListItemButton>
            </ListItem>

        return filteredTasks.length ? filteredTasks.map(t => item(t)) : tasks[id].map(t => item(t))
    }

    function updateTaskTitle(idList: ListType["id"], id: TaskProps["id"], title: TaskProps["title"]) {
        dispatch(changeTaskTitleAC({ todolistId: idList, taskId: id, title }))
    }

    function deleteTask(idList: ListType["id"], id: TaskProps["id"]) {
        dispatch(deleteTaskAC({ todolistId: idList, taskId: id }))
    }

    function updateTask(idList: ListType["id"], id: TaskProps["id"]) {
        dispatch(changeTaskStatusAC({ todolistId: idList, taskId: id }))
    }

    return (
        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 260 }} >
            {tasks[id].length ? ListItems() : <span>List is empty</span>}
        </List>
    )
}