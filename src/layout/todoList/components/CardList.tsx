import { Button } from "../../../components/Buttons";
import s from "./CardList.module.css"
import { AddItem } from "../../../components/AddItem";
import { EditebleTitle } from "../../../components/EditebleTitle";
import ButtonGroup from '@mui/material/ButtonGroup';
import { MenuList } from "./menuList";
import { Badge, Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
    updateListFilter: (id: ListType["id"], filter: ListType["filter"]) => void;
    updateListTitle: (id: ListType["id"], filter: ListType["title"]) => void;
    delList: (idList: ListType["id"]) => void;
    createTask: (idList: ListType["id"], title: TaskProps["title"]) => void;
    changeDone: (idList: ListType["id"], id: TaskProps["id"]) => void;
    delTask: (idList: ListType["id"], id: TaskProps["id"]) => void;
    changeTitle: (idList: ListType["id"], id: TaskProps["id"], title: TaskProps["title"]) => void;
}


export const CardList = ({ id, title, filter, tasks, updateListFilter, updateListTitle,
    delList, createTask, changeDone, delTask, changeTitle }: Props) => {

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

        const item = (data: TaskProps) =>
            <ListItem key={data.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => delTask(id, data.id)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>}>
                <ListItemButton role={undefined} onClick={() => changeDone(id, data.id)} dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={data.isDone}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <EditebleTitle title={data.title}
                        setNewTitle={(title: TaskProps["title"]) => changeTitle(id, data.id, title)} />
                </ListItemButton>
            </ListItem>


        return filteredTasks.length ? filteredTasks.map(t => item(t)) : tasks.map(t => item(t))
    }

    function AddTaskHandler(title: TaskProps["title"]) {
        createTask(id, title)
    }

    function EditTitle(title: ListType["title"]) {
        updateListTitle(id, title)
    }

    return (
        <Paper className={s.wrapper}>
            <Box className={s.titleWrapper}>
                <Badge color="secondary" badgeContent={tasks.length} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    {/* <ArticleOutlinedIcon sx={{ fontSize: 30 }} /> */}

                    <h2><EditebleTitle title={title} setNewTitle={EditTitle} /></h2></Badge>
                <MenuList deleteList={() => delList(id)} />
            </Box>
            <ButtonGroup sx={{ marginBottom: '10px' }} aria-label="Medium-sized button group">
                <Button primary={filter === "all" ? true : false}
                    name="All"
                    callBack={() => updateListFilter(id, filter = "all")} />
                <Button primary={filter === "active" ? true : false}
                    name="Active"
                    callBack={() => updateListFilter(id, filter = "active")} />
                <Button primary={filter === "complited" ? true : false}
                    name="Complited"
                    callBack={() => updateListFilter(id, filter = "complited")} />
            </ButtonGroup>
            <List sx={{ width: '100%' }}>
                {tasks.length ? ListItems() : <span>List is empty</span>}
            </List>

            <Box className={s.addWrapper}>
                <AddItem createItem={AddTaskHandler} label="New task" />
            </Box>

        </Paper>
    )
}