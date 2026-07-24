import { createSlice, nanoid } from '@reduxjs/toolkit'

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: {
        todoLists: [] as Todolist[],
    },
    selectors: {
        selectLists: (state) => state.todoLists,
    },
    reducers: (create) => ({
        deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
            const index = state.todoLists.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state.todoLists.splice(index, 1)
            }
        }),
        changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
            const index = state.todoLists.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
                state.todoLists[index].title = action.payload.title
            }
        }),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: Filter }>((state, action) => {
            const todolist = state.todoLists.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
        createTodolistAC: create.preparedReducer(
            (title: string) => {
                const newTodolist: Todolist = { id: nanoid(), title, filter: 'all' }
                return { payload: newTodolist }
            },
            (state, action) => {
                state.todoLists.push(action.payload)
            },
        ),
    }),
})

export const { deleteTodolistAC, createTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC } =
    todolistsSlice.actions
export const { selectLists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type Todolist = {
    id: string
    title: string
    filter: Filter
}
export type ListType = {
    id: string
    title: string
    filter: Filter
}

export type Filter = 'all' | 'active' | 'completed'
