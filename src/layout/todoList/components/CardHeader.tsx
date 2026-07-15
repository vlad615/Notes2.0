import { MenuList } from "./MenuList";
import { Badge, Box } from "@mui/material";
import s from "../CardList.module.css";
import { EditebleTitle } from "@/components/EditebleTitle";
import { useAppDispatch } from "@/commun/hooks/useAppDispatch";
import { changeTodolistTitleAC, deleteTodolistAC, type ListType } from "@/model/list/todolists-reducer";
import { deleteAllTasksAC } from "@/model/task/tasks-reducer";
import { useAppSelector } from "@/commun/hooks/useAppSelector";
import { selectTasks } from "@/model/task/tasks-selector";

type Props = {
    id: ListType["id"]
    currentTitle: ListType["title"]
}

export const CardHeader = ({id, currentTitle}: Props) => {
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    function editListTitle(id: ListType["id"], title: ListType["title"]) {
        dispatch(changeTodolistTitleAC({ id, title }))
    }

    function deleteList(id: ListType["id"]) {
        dispatch(deleteTodolistAC({ id }))
    }

    function deleteAllTasks(id: ListType["id"]) {
        dispatch(deleteAllTasksAC({ id }))
    }

    return (
        <Box className={s.titleWrapper}>
            <Badge color="secondary" badgeContent={tasks[id].length} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <h2><EditebleTitle title={currentTitle} setNewTitle={(title) => editListTitle(id, title)} /></h2>
            </Badge>
            <MenuList deleteList={() => deleteList(id)} deleteAllTasks={() => deleteAllTasks(id)} />
        </Box>
    )
}