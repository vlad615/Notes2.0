import { useState } from "react";
import { CardList, type ListType } from "./components/CardList";
import type { TaskProps } from "./components/CardList";
import { AddItem } from "../../components/AddItem";
import s from "./ToDoLists.module.css"


export type TasksType = {
    [idList: string]: TaskProps[]
}

type Props = {
    list: ListType[]
    tasks: TasksType
}


export const ToDoLists = ({ list, tasks }: Props) => {
    const [currentLists, setCurrentLists] = useState(list)
    const [currentTasks, setCurrentTasks] = useState(tasks)

    function createList(title: ListType["title"]) {
        const newId = crypto.randomUUID()
        setCurrentLists(prev => [{
            id: newId,
            title,
            filter: "all"
        }, ...prev])

        setCurrentTasks(prev => ({ [newId]: [], ...prev }))
    }

    function updateList(data: ListType) {
        setCurrentLists(currentLists.map(i => i.id === data.id ? { ...i, title: data.title, filter: data.filter } : i))
        console.log(currentLists, currentTasks);

    }

    function deleteList(id: ListType["id"]) {
        setCurrentLists(currentLists.filter(i => i.id !== id))
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
        <div className="container">
            <section>
                <div className={s.tasksWrapper}>
                    <b>New List Tasks:</b>
                    <AddItem createItem={createList} />
                </div>
                <div className={s.tasksWrapper}>
                    {currentLists.map(l => <CardList key={l.id} tasks={currentTasks[l.id]} {...l}
                        updateList={updateList}
                        delList={deleteList}
                        createTask={createTask}
                        changeDone={updateTask}
                        delTask={deleteTask}
                        changeTitle={updateTaskTitle} />)}
                </div>
            </section>
        </div>
    )
}