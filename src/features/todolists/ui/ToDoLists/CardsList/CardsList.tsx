import { useAppDispatch } from "@/commun/hooks/useAppDispatch";
import { useAppSelector } from "@/commun/hooks/useAppSelector";
import { selectLists } from "@/features/todolists/model/todolist-selector";
import { type ListType } from "@/features/todolists/model/todolists-reducer";
import { Box, Paper } from "@mui/material";
import s from "./CardsList.module.css";
import { AddItem } from "@/commun/components/AddItem/AddItem";
import { createTaskAC, type TaskProps } from "@/features/todolists/model/tasks-reducer";
import { FilterButtons } from "@/features/todolists/ui/ToDoLists/CardsList/FilterButtons/FilterButtons";
import { Tasks } from "./Tasks/Tasks";
import { CardHeader } from "./CardHeader/CardHeader";

export const CardsList = () => {
    const lists = useAppSelector(selectLists)
    const dispatch = useAppDispatch()

    function createTask(id: ListType["id"], title: TaskProps["title"]) {
        dispatch(createTaskAC({ todolistId: id, title }))
    }

    return (
        <>
            {
                lists.map(list =>
                    <Paper className={s.wrapper} key={list.id} >
                        <CardHeader id={list.id} currentTitle={list.title} />
                        <FilterButtons id={list.id} filter={list.filter}/>
                        <Tasks id={list.id} filter={list.filter} />
                        <Box className={s.addWrapper}>
                            <AddItem createItem={(title) => createTask(list.id, title)} label="New task" />
                        </Box>
                    </Paper>
                )
            }
        </>
    )
}