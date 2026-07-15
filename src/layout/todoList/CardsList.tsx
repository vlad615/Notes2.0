import { useAppDispatch } from "@/commun/hooks/useAppDispatch";
import { useAppSelector } from "@/commun/hooks/useAppSelector";
import { selectLists } from "@/model/list/todolist-selector";
import { type ListType } from "@/model/list/todolists-reducer";
import { Box, Paper } from "@mui/material";
import { CardHeader } from "./components/CardHeader";
import s from "./CardList.module.css";
import { Tasks } from "./components/Tasks";
import { AddItem } from "@/components/AddItem";
import { createTaskAC, type TaskProps } from "@/model/task/tasks-reducer";
import { FilterButtons } from "./components/FilterButtons";

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