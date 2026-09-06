import { createAppSlice } from '@/commun/utils/createAppSlice'
import { domainTaskSchema, tasksApi, type DomainTask, type UpdateTaskModel } from '../api'
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
        fetchTasksTC: create.asyncThunk(
            async (todolistid: string, thunkAPI) => {
                try {
                    const res = await tasksApi.getTasks(todolistid)
                    domainTaskSchema.array().parse(res.data.items)
                    return { todolistid, tasks: res.data.items }
                } catch (error) {
                    console.log(error)
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.tasksState[action.payload.todolistid] = action.payload.tasks
                },
            },
        ),
        createTaskTC: create.asyncThunk(
            async (payload: { todolistId: string; title: string }, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const res = await tasksApi.createTask(payload)
                    domainTaskSchema.parse(res.data.data.item)
                    if (res.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        return { task: res.data.data.item }
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
                    const newTask = action.payload.task
                    state.tasksState[newTask.todoListId].unshift(newTask)
                },
            },
        ),
        deleteTaskTC: create.asyncThunk(
            async (args: { todolistId: string; taskId: string }, { rejectWithValue, dispatch }) => {
                try {
                    dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: true }))
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const response = await tasksApi.deleteTask(args)
                    if (response.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))

                        dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: false }))
                        return args
                    } else {
                        dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: false }))
                        handleServerAppError(response.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: false }))
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
                    dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: true }))
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
                    const res = await tasksApi.updateTask({
                        todolistId: args.todolistId,
                        taskId: args.taskId,
                        model,
                    })
                    domainTaskSchema.parse(res.data.data.item)
                    if (res.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: false }))
                        return { todolistId: args.todolistId, taskId: args.taskId, response: res.data.data.item }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: false }))
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    dispatch(updatingTaskAC({ todolistId: args.todolistId, taskId: args.taskId, updating: false }))
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
        updatingTaskAC: create.reducer<{ todolistId: string; taskId: string; updating: boolean }>((state, action) => {
            const { todolistId, taskId, updating } = action.payload
            const task = state.tasksState[todolistId].find((task) => task.id === taskId)
            if (task) {
                task.updating = updating
            }
        }),
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
export const {
    deleteTaskTC,
    updateTaskTC,
    deleteAllTasksTC,
    fetchTasksTC,
    createTaskTC,
    deleteAllDoneTasksTC,
    updatingTaskAC,
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksType = Record<string, DomainTask[]>
