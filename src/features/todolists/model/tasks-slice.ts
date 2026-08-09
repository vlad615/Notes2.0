import { createAppSlice } from '@/commun/utils/createAppSlice'
import { tasksApi, type DomainTask, type UpdateTaskModel } from '../api'
import { createTodolistTC, deleteTodolistTC, changeTodolistEntityStatusAC } from './todolists-slice'
import type { RootState } from '@/app/store'
import { ResultCode, TaskStatus } from '@/commun/enums'
import { changeRequestStatus } from '@/app'
import { handleServerAppError, handleServerNetworkError } from '@/commun/utils'

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {
        tasksState: {} as TasksType,
    },
    selectors: {
        selectTasks: (state) => state.tasksState,
    },
    reducers: (create) => ({
        createTaskTC: create.asyncThunk(
            async (payload: { todolistId: string; title: string }, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const response = await tasksApi.createTask(payload)
                    if (response.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        return { task: response.data.data.item }
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
                    const newTask = action.payload.task
                    state.tasksState[newTask.todoListId].unshift(newTask)
                },
            },
        ),
        fetchTasksTC: create.asyncThunk(
            async (todolistid: string, thunkAPI) => {
                try {
                    const res = await tasksApi.getTasks(todolistid)
                    return { todolistid, tasks: res.data.items }
                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.tasksState[action.payload.todolistid] = action.payload.tasks
                },
            },
        ),
        deleteTaskTC: create.asyncThunk(
            async (args: { todolistId: string; taskId: string }, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'loading' }))
                    const response = await tasksApi.deleteTask(args)
                    if (response.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'succeeded' }))
                        return args
                    } else {
                        dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'idle' }))
                        handleServerAppError(response.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'idle' }))
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.tasksState[action.payload.todolistId].findIndex(
                        (task) => task.id === action.payload.taskId,
                    )
                    if (index !== -1) {
                        state.tasksState[action.payload.todolistId].splice(index, 1)
                    }
                },
            },
        ),
        updateTaskTC: create.asyncThunk(
            async (
                args: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
                { rejectWithValue, getState, dispatch },
            ) => {
                try {
                    dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'loading' }))
                    const state = getState() as RootState
                    const task = state.tasks.tasksState[args.todolistId].find((t) => t.id === args.taskId)
                    if (!task) return rejectWithValue('Task not found')
                    let model: UpdateTaskModel = {
                        status: task.status,
                        description: task.description,
                        title: task.title,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                    }
                    Object.assign(model, args.domainModel)
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const response = await tasksApi.updateTask({
                        todolistId: args.todolistId,
                        taskId: args.taskId,
                        model,
                    })
                    if (response.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'idle' }))
                        return { todolistId: args.todolistId, taskId: args.taskId, response: response.data.data.item }
                    } else {
                        handleServerAppError(response.data, dispatch)
                        dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'idle' }))
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    dispatch(changeTodolistEntityStatusAC({ id: args.todolistId, entityStatus: 'idle' }))
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.tasksState[action.payload.todolistId].findIndex(
                        (t) => t.id === action.payload.taskId,
                    )
                    if (index !== -1) {
                        state.tasksState[action.payload.todolistId][index] = action.payload.response
                    }
                },
            },
        ),
        deleteAllTasksTC: create.asyncThunk(
            async (todolistId: string, { rejectWithValue, getState, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'loading' }))
                    const state = getState() as RootState
                    const tasks = state.tasks.tasksState[todolistId]
                    const tasksIds = await tasksApi.deleteTasks(todolistId, tasks)
                    dispatch(changeRequestStatus({ status: 'succeeded' }))
                    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'succeeded' }))
                    return { todolistId, ids: tasksIds }
                } catch (error) {
                    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'failed' }))
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload.ids.forEach((id) => {
                        const index = state.tasksState[action.payload.todolistId].findIndex((task) => task.id === id)
                        index !== -1 && state.tasksState[action.payload.todolistId].splice(index, 1)
                    })
                },
            },
        ),
        deleteAllDoneTasksTC: create.asyncThunk(
            async (todolistId: string, { rejectWithValue, getState, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'loading' }))
                    const state = getState() as RootState
                    const tasks = state.tasks.tasksState[todolistId]
                    const tasksIds = await tasksApi.deleteTasks(
                        todolistId,
                        tasks.filter((t) => t.status === TaskStatus.Completed),
                    )
                    dispatch(changeRequestStatus({ status: 'succeeded' }))
                    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'succeeded' }))
                    return { todolistId, ids: tasksIds }
                } catch (error) {
                    dispatch(changeTodolistEntityStatusAC({ id: todolistId, entityStatus: 'failed' }))
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload.ids.forEach((id) => {
                        const index = state.tasksState[action.payload.todolistId].findIndex((task) => task.id === id)
                        index !== -1 && state.tasksState[action.payload.todolistId].splice(index, 1)
                    })
                },
            },
        ),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.tasksState[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state.tasksState[action.payload.id]
            })
    },
})

export const { selectTasks } = tasksSlice.selectors
export const { deleteTaskTC, updateTaskTC, deleteAllTasksTC, fetchTasksTC, createTaskTC, deleteAllDoneTasksTC } =
    tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksType = Record<string, DomainTask[]>
