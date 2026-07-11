import { useReducer, useState } from "react";
import { CardList, type ListType } from "./components/CardList";
import type { TaskProps } from "./components/CardList";
import s from "./ToDoLists.module.css"
import { Form } from "./components/Form";
import { Box } from "@mui/material";
import { createListAC, deleteListAC, listReducer, updateFilterListAC, updateTitleListAC } from "../../model/list/list-reducer";

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

const tasks: TasksType =
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
    const [currentTasks, setCurrentTasks] = useState(tasks)

    function createList(title: ListType["title"]) {
        const action = createListAC(title)
        dispatchLists(action)
        setCurrentTasks(prev => ({ [action.payload.id]: [], ...prev }))
    }

    function updateListFilter(id: ListType["id"],filter: ListType["filter"]) {
        dispatchLists(updateFilterListAC({id, filter}))
        console.log(lists, currentTasks);
    }

    function updateListTitle(id: ListType["id"], title: ListType["title"]) {
        dispatchLists(updateTitleListAC({id, title}))
        console.log(lists, currentTasks);
    }

    function deleteList(id: ListType["id"]) {
        dispatchLists(deleteListAC(id))
    }

    function createTask(idList: ListType["id"], title: TaskProps["title"]) {
        setCurrentTasks(prev => ({
            ...prev,
            [idList]: [
                ...prev[idList],
                {
                    id: crypto.randomUUID(),
                    title,
                    isDone: false
                }
            ]
        }))
    }

    function updateTask(idList: ListType["id"], id: TaskProps["id"]) {
        let updated = { ...currentTasks }
        updated[idList] = updated[idList].map(t => t.id === id ? { ...t, isDone: !t.isDone } : t)
        setCurrentTasks(updated)
    }

    function updateTaskTitle(idList: ListType["id"], id: TaskProps["id"], title: TaskProps["title"]) {
        let updated = { ...currentTasks }
        updated[idList] = updated[idList].map(t => t.id === id ? { ...t, title } : t)
        setCurrentTasks(updated)
    }

    function deleteTask(idList: ListType["id"], id: TaskProps["id"]) {
        let updated = { ...currentTasks }
        updated[idList] = updated[idList].filter(t => t.id !== id)
        setCurrentTasks(updated)
    }

    return (
        <Box component={'section'}>
            <Box className="container">
                <Box className={s.wrapper}>
                    <Form createList={createList} />
                    <Box className={s.tasksWrapper}>
                        {lists.map(l => <CardList key={l.id} tasks={currentTasks[l.id]} {...l}
                            updateListFilter={updateListFilter}
                            updateListTitle={updateListTitle}
                            delList={deleteList}
                            createTask={createTask}
                            changeDone={updateTask}
                            delTask={deleteTask}
                            changeTitle={updateTaskTitle} />)}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}