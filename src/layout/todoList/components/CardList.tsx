import { Button } from "../../../components/Buttons";
import s from "./CardList.module.css"
import { AddItem } from "../../../components/AddItem";
import { EditebleTitle } from "../../../components/EditebleTitle";
import ButtonGroup from '@mui/material/ButtonGroup';
import { MenuList } from "./menuList";


type Filter = "all" | "complited" | "active"

export type ListType = {
    id: string
    title: string
    filter: Filter
}

export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

type Props = ListType & {
    tasks: TaskProps[],
    // createList: ()=>void;
    updateList: (data: ListType) => void;
    delList: (idList: ListType["id"]) => void;
    createTask: (idList: ListType["id"], title: TaskProps["title"]) => void;
    changeDone: (idList: ListType["id"], id: TaskProps["id"]) => void;
    delTask: (idList: ListType["id"], id: TaskProps["id"]) => void;
    changeTitle: (idList: ListType["id"], id: TaskProps["id"], title: TaskProps["title"]) => void;
}


export const CardList = ({ id, title, filter, tasks, updateList, delList, createTask, changeDone, delTask, changeTitle }: Props) => {

    function ListItems() {
        let filteredTasks: Props["tasks"] = [];

        if (filter === "active") {
            filteredTasks = tasks.filter(t => !t.isDone)
            if (!filteredTasks.length) {
                return <span>All tasks is done!</span>
            }
        } else if (filter === "complited") {
            filteredTasks = tasks.filter(t => t.isDone)
            if (!filteredTasks.length) {
                return <span>U have complite no tasks, yet!</span>
            }
        }

        const item = (data: TaskProps) => <li key={data.id}>
            <label className={data.isDone ? s.done : s.active}>
                <input type="checkbox" checked={data.isDone} onChange={() => changeDone(id, data.id)} />
                <EditebleTitle title={data.title}
                    setNewTitle={(title: TaskProps["title"]) => changeTitle(id, data.id, title)} />
            </label>
            <Button name="x" callBack={() => delTask(id, data.id)} />
        </li>

        return filteredTasks.length ? filteredTasks.map(t => item(t)) : tasks.map(t => item(t))
    }

    function AddTaskHandler(title: TaskProps["title"]) {
        createTask(id, title)
    }

    function EditTitle(title: ListType["title"]) {
        updateList({ id, filter, title })
    }

    return (
        <div className={s.wrapper}>

            <div className={s.titleWrapper}>
                <h2><EditebleTitle title={title} setNewTitle={EditTitle} /></h2>
                <MenuList deleteList={()=>delList(id)}/>
            </div>
            <span className="counter">{tasks.length} tasks</span>
            <div className={s.addWrapper}>
                <AddItem createItem={AddTaskHandler} label="New task" /></div>
            <div>
                <ButtonGroup color="secondary" aria-label="Medium-sized button group">
                    <Button primary={filter === "all" ? true : false}
                        name="All"
                        callBack={() => updateList({ id, title, filter: "all" })} />
                    <Button primary={filter === "active" ? true : false}
                        name="Active"
                        callBack={() => updateList({ id, title, filter: "active" })} />
                    <Button primary={filter === "complited" ? true : false}
                        name="Complited"
                        callBack={() => updateList({ id, title, filter: "complited" })} />
                </ButtonGroup>

            </div>

            <ul>
                {tasks.length ? ListItems() : <span>List is empty</span>}
            </ul>

        </div>
    )
}