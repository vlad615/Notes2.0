import { createAppSlice } from '@/commun/utils/createAppSlice'
import { todolistsApi, todolistShema, type Filter, type ListType } from '../api'
import { changeRequestStatus } from '@/app/app-slice'
import { handleServerAppError, handleServerNetworkError } from '@/commun/utils'
import { ResultCode } from '@/commun/enums'
import type { RequestStatus } from '@/commun/types/BaseResponse'

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
            async (_, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const res = await todolistsApi.getTodoLists()
                    todolistShema.array().parse(res.data)
                    dispatch(changeRequestStatus({ status: 'succeeded' }))
                    return { todolists: res.data }
                } catch (error) {
                    dispatch(changeRequestStatus({ status: 'failed' }))
                    handleServerNetworkError(error, dispatch)

                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.todoLists =
                        action.payload?.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' })) ?? []
                },
            },
        ),
        createTodolistTC: create.asyncThunk(
            async (title: string, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const res = await todolistsApi.createTodolist(title)
                    todolistShema.parse(res.data.data.item)
                    if (res.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        return { todolist: res.data.data.item }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.todoLists.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
                },
            },
        ),
        deleteTodolistTC: create.asyncThunk(
            async (id: string, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'loading' }))
                    const response = await todolistsApi.deleteTodolist(id)
                    if (response.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        return { id }
                    } else {
                        handleServerAppError(response.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
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
            async (args: { id: string; title: string }, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const res = await todolistsApi.changeTodolistTitle(args.id, args.title)
                    if (res.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        return args
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
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
        changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
            const todolist = state.todoLists.find((todolist) => todolist.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        }),
    }),
})

export const {
    deleteTodolistTC,
    createTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    changeTodolistEntityStatusAC,
} = todolistsSlice.actions
export const { selectLists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
