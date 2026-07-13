import { useReducer } from "react";
import { CardList, type ListType } from "./components/CardList";
import type { TaskProps } from "./components/CardList";
import s from "./ToDoLists.module.css"
import { Form } from "./components/Form";
import { Box } from "@mui/material";
import { createListAC, deleteListAC, listReducer, updateFilterListAC, updateTitleListAC } from "../../model/list/list-reducer";
import { createListTasksAC, createTaskAC, deleteListTaskAC, deleteTaskAC, tasksReducer, updateStatusTaskAC, updateTitleTaskAC } from "../../model/task/task-reducer";

const task1 = crypto.randomUUID()
const task2 = crypto.randomUUID()

const toDoLists: ListType[] = [
    {
        id: task1,
        title: "Programing",
        filter: "all"
    },
    {
        id: task2,
        title: "To be happy",
        filter: "all"
    },
]

const tasksInitial: TasksType =
{
    [task1]: [
        { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
        { id: crypto.randomUUID(), title: 'JS', isDone: true },
        { id: crypto.randomUUID(), title: 'ReactJS', isDone: false },
    ],

    [task2]: [
        { id: crypto.randomUUID(), title: 'Hello world', isDone: true },
        { id: crypto.randomUUID(), title: 'I am Happy', isDone: false },
        { id: crypto.randomUUID(), title: 'Yo', isDone: false },]

}

export type TasksType = {
    [idList: string]: TaskProps[]
}


export const ToDoLists = () => {
    const [lists, dispatchLists] = useReducer(listReducer, toDoLists)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksInitial)

    function createList(title: ListType["title"]) {
        const action = createListAC(title)
        dispatchLists(action)
        dispatchTasks(createListTasksAC(action.payload.id))
    }

    function updateListFilter(id: ListType["id"],filter: ListType["filter"]) {
        dispatchLists(updateFilterListAC({id, filter}))
        console.log(lists, tasks);
    }

    function updateListTitle(id: ListType["id"], title: ListType["title"]) {
        dispatchLists(updateTitleListAC({id, title}))
        console.log(lists, tasks);
    }

    function deleteList(id: ListType["id"]) {
        dispatchLists(deleteListAC(id))
        dispatchTasks(deleteListTaskAC(id))
    }

    function createTask(idList: ListType["id"], title: TaskProps["title"]) {
        dispatchTasks(createTaskAC({id: idList, title}))
    }

    function updateTask(idList: ListType["id"], id: TaskProps["id"]) {
        dispatchTasks(updateStatusTaskAC({idList, id}))
    }

    function updateTaskTitle(idList: ListType["id"], id: TaskProps["id"], title: TaskProps["title"]) {
        dispatchTasks(updateTitleTaskAC({idList, id, title}))
    }

    function deleteTask(idList: ListType["id"], id: TaskProps["id"]) {
        let updated = { ...tasks }
        updated[idList] = updated[idList].filter(t => t.id !== id)
        dispatchTasks(deleteTaskAC({idList, id}))
    }

    function deleteAllTasks(id: ListType["id"]){
        dispatchTasks(createListTasksAC(id))
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
                            deleteAllTasks={deleteAllTasks}/>)}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}