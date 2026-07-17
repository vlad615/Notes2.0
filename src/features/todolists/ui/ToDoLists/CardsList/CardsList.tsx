import { useAppDispatch } from "@/commun/hooks/useAppDispatch";
import { useAppSelector } from "@/commun/hooks/useAppSelector";
import { selectLists } from "@/features/todolists/model/todolist-selector";
import { type ListType } from "@/features/todolists/model/todolists-reducer";
import { Box, Paper } from "@mui/material";
import s from "./CardList.module.css";
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
                lists.map(l =>
                    <Paper className={s.wrapper} key={l.id} >
                        <CardHeader id={l.id} currentTitle={l.title} />
                        <FilterButtons id={l.id} filter={l.filter}/>
                        <Tasks id={l.id} filter={l.filter} />
                        <Box className={s.addWrapper}>
                            <AddItem createItem={(title) => createTask(l.id, title)} label="New task" />
                        </Box>
                    </Paper>
                )
            }
        </>
    )
}