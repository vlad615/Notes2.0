import type { ListType } from "../layout/todoList/components/CardList";




type Action = ReturnType<typeof deleteListAC>

const initialState: ListType[] = []

export const listReducer = (state: ListType[] = initialState, action: Action): ListType[] => {
    const pload = action.payload
    switch (action.type){
        case 'delete':
            return state.filter(i => i.id !== pload.id)
        default:
            return state
    }
}

export const deleteListAC = (id: ListType["id"]) => {
    return {type: 'delete', payload: {id}} as const
}