import { CardList, type ListType } from "./components/CardList";
import type { TaskProps } from "./components/CardList";
import s from "./ToDoLists.module.css"
import { Form } from "./components/Form";
import { Box } from "@mui/material";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC } from "../../model/list/todolists-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteAllTasksAC, deleteTaskAC } from "../../model/task/tasks-reducer";
import { useAppSelector } from "../../commun/hooks/useAppSelector";
import { useAppDispatch } from "../../commun/hooks/useAppDispatch";


export type TasksType = Record<string, TaskProps[]>


export const ToDoLists = () => {
    const lists = useAppSelector((state) => state.todoLists)
    const tasks = useAppSelector((state) => state.tasks)

    const dispatch = useAppDispatch()

    function createList(title: ListType["title"]) {
        dispatch(createTodolistAC(title))
    }

    function updateListFilter(id: ListType["id"], filter: ListType["filter"]) {
        dispatch(changeTodolistFilterAC({ id, filter }))
    }

    function updateListTitle(id: ListType["id"], title: ListType["title"]) {
        dispatch(changeTodolistTitleAC({ id, title }))
    }

    function deleteList(id: ListType["id"]) {
        dispatch(deleteTodolistAC(id))
    }

    function createTask(idList: ListType["id"], title: TaskProps["title"]) {
        dispatch(createTaskAC({ todolistId: idList, title }))
    }

    function updateTask(idList: ListType["id"], id: TaskProps["id"]) {
        dispatch(changeTaskStatusAC({ todolistId: idList, taskId: id }))
    }

    function updateTaskTitle(idList: ListType["id"], id: TaskProps["id"], title: TaskProps["title"]) {
        dispatch(changeTaskTitleAC({ todolistId: idList, taskId: id, title }))
    }

    function deleteTask(idList: ListType["id"], id: TaskProps["id"]) {
        dispatch(deleteTaskAC({ todolistId: idList, taskId: id }))
    }

    function deleteAllTasks(id: ListType["id"]) {
        dispatch(deleteAllTasksAC({id}))
    }

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <Form createList={createList} />
                    <Box className={s.tasksWrapper}>
                        {lists.map(l => <CardList key={l.id} tasks={tasks[l.id]} {...l}
                            updateListFilter={updateListFilter}
                            updateListTitle={updateListTitle}
                            delList={deleteList}
                            createTask={createTask}
                            changeDone={updateTask}
                            delTask={deleteTask}
                            changeTitle={updateTaskTitle}
                            deleteAllTasks={deleteAllTasks} />)}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}