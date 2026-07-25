import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { todolistsApi, type Todolist } from '../api'

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: {
        todoLists: [] as ListType[],
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
                const newTodolist: ListType = { id: nanoid(), title, filter: 'all', addedDate: Date(), order: 12 }
                return { payload: newTodolist }
            },
            (state, action) => {
                state.todoLists.push(action.payload)
            },
        ),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (_state, action) => ({
                todoLists: action.payload.map((td) => ({ ...td, filter: 'all' })),
            }))
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.todoLists.unshift({ ...action.payload.data.item, filter: 'all' })
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.todoLists.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.todoLists.splice(index, 1)
                }
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const task = state.todoLists.find((todolist) => todolist.id === action.payload.id)
                if (task) {
                    task.title = action.payload.title
                }
            })
    },
})

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async () => {
    const res = await todolistsApi.getTodoLists()
    return res.data
})

export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async (args: { title: string }, {}) => {
        const res = await todolistsApi.createTodolist(args.title)
        return res.data
    },
)

export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async (args: { id: string }, {}) => {
        await todolistsApi.deleteTodolist(args.id)
        return args
    },
)

export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (args: { id: string; title: string }, {}) => {
        await todolistsApi.changeTodolistTitle(args.id, args.title)
        return args
    },
)

export const { deleteTodolistAC, createTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC } =
    todolistsSlice.actions
export const { selectLists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type ListType = Todolist & {
    filter: Filter
}

export type Filter = 'all' | 'active' | 'completed'
