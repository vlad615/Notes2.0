import { createAppSlice } from '@/commun/utils/createAppSlice'
import { todolistsApi, type Todolist } from '../api'

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: {
        todoLists: [] as ListType[],
    },
    selectors: {
        selectLists: (state) => state.todoLists,
    },

    reducers: (create) => ({
        fetchTodolistsTC: create.asyncThunk(
            async (_, thunkAPI) => {
                try {
                    const res = await todolistsApi.getTodoLists()
                    return { todolists: res.data }
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload?.todolists.forEach((tl) => {
                        state.todoLists.push({ ...tl, filter: 'all' })
                    })
                },
            },
        ),
        createTodolistTC: create.asyncThunk(
            async (title: string, { rejectWithValue }) => {
                try {
                    const res = await todolistsApi.createTodolist(title)
                    return { todolist: res.data.data.item }
                } catch (error) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.todoLists.unshift({ ...action.payload.todolist, filter: 'all' })
                },
            },
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, { rejectWithValue }) => {
                try {
                    await todolistsApi.deleteTodolist(id)
                    return { id }
                } catch (error) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.todoLists.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.todoLists.splice(index, 1)
                    }
                },
            },
        ),
        changeTodolistTitleTC: create.asyncThunk(
            async (args: { id: string; title: string }, { rejectWithValue }) => {
                try {
                    await todolistsApi.changeTodolistTitle(args.id, args.title)
                    return args
                } catch (error) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state.todoLists.find((todolist) => todolist.id === action.payload.id)
                    if (task) {
                        task.title = action.payload.title
                    }
                },
            },
        ),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: Filter }>((state, action) => {
            const todolist = state.todoLists.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
    }),
})

export const { deleteTodolistTC, createTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC } =
    todolistsSlice.actions
export const { selectLists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type ListType = Todolist & {
    filter: Filter
}

export type Filter = 'all' | 'active' | 'completed'
