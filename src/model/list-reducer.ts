import type { ListType } from "../layout/todoList/components/CardList";

type Action = ReturnType<typeof deleteListAC> | ReturnType<typeof createListAC> | ReturnType<typeof updateTitleListAC> |
    ReturnType<typeof updateFilterListAC>

const initialState: ListType[] = []

export const listReducer = (state: ListType[] = initialState, action: Action): ListType[] => {
    switch (action.type) {
        case 'create':
            return [{
                id: crypto.randomUUID(),
                title: action.payload.title,
                filter: "all"
            }, ...state]
        case 'update_title':
            return state.map(i => i.id === action.payload.id ? { ...i, title: action.payload.title } : i)
        case 'update_filter':
            return state.map(i => i.id === action.payload.id ? { ...i, filter: action.payload.filter } : i)
        case 'delete':
            return state.filter(i => i.id !== action.payload.id)
        default:
            return state
    }
}

export const createListAC = (title: ListType["title"]) => {
    return { type: 'create', payload: { title } } as const
}

export const updateTitleListAC = (data: {id: ListType["id"], title: ListType["title"]}) => {
    return { type: 'update_title', payload: { title: data.title, id:data.id } } as const
}

export const updateFilterListAC = (data: {id: ListType["id"], filter: ListType["filter"]}) => {
    return { type: 'update_filter', payload: { filter: data.filter, id: data.id } } as const
}

export const deleteListAC = (id: ListType["id"]) => {
    return { type: 'delete', payload: { id } } as const
}