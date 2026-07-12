import type { ListType, TaskProps } from "../../layout/todoList/components/CardList";
import type { TasksType } from "../../layout/todoList/ToDoLists";

type Action = ReturnType<typeof createListTasksAC> | ReturnType<typeof createTaskAC> | ReturnType<typeof updateTitleTaskAC>
    | ReturnType<typeof updateStatusTaskAC> | ReturnType<typeof deleteTaskAC> | ReturnType<typeof deleteListTaskAC>

export const tasksReducer = (state: TasksType, action: Action): TasksType => {
    switch (action.type) {
        case 'create_list':
            return { [action.payload.id]: [], ...state }
        case 'create':
            return {
                ...state,
                [action.payload.id]: [
                    {
                        id: crypto.randomUUID(),
                        title: action.payload.title,
                        isDone: false
                    }, ...state[action.payload.id]
                ]
            }
        case 'update_title': {
            const idList = action.payload.idList
            let updated = { ...state }
            updated[idList] = updated[idList].map(t => t.id === action.payload.id ? { ...t, title: action.payload.title } : t)
            return updated
        }
        case 'update_status':
            const idList = action.payload.idList
            let updated = { ...state }
            updated[idList] = updated[idList].map(t => t.id === action.payload.id ? { ...t, isDone: !t.isDone } : t)
            return updated
        case 'delete_list': {
            let updated = { ...state }
            delete updated[action.payload.id]
            return updated
        }
        case "delete": {
            const idList = action.payload.idList
            let updated = { ...state }
            updated[idList] = updated[idList].filter(t => t.id !== action.payload.id)
            return updated
        }
        default:
            return state
    }
}

export const createListTasksAC = (id: ListType["id"]) => {
    return { type: 'create_list', payload: { id } } as const
}

export const createTaskAC = (data: { id: ListType["id"], title: TaskProps["title"] }) => {
    return { type: 'create', payload: { id: data.id, title: data.title } } as const
}

export const updateTitleTaskAC = (data: { idList: ListType["id"], id: TaskProps["id"], title: TaskProps["title"] }) => {
    return { type: 'update_title', payload: { idList: data.idList, title: data.title, id: data.id } } as const
}

export const updateStatusTaskAC = (data: { idList: ListType["id"], id: TaskProps["id"] }) => {
    return { type: 'update_status', payload: { id: data.id, idList: data.idList } } as const
}

export const deleteListTaskAC = (id: ListType["id"]) => {
    return { type: 'delete_list', payload: { id } } as const
}

export const deleteTaskAC = (data: { idList: ListType["id"], id: TaskProps["id"] }) => {
    return { type: 'delete', payload: { id: data.id, idList: data.idList } } as const
}

