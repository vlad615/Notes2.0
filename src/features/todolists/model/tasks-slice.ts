import type { RootState } from '@/app/store.ts'
import { TaskStatus } from '@/commun/enums'
import { createAppSlice } from '@/commun/utils/createAppSlice'
import { tasksApi, type DomainTask, type UpdateTaskModel } from '../api'
import { createTodolistAC, deleteTodolistAC } from './todolists-slice'

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
            async (payload: { todolistId: string; title: string }, { rejectWithValue }) => {
                try {
                    const response = await tasksApi.createTask(payload)
                    return { task: response.data.data.item }
                } catch (error) {
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
            async (args: { todolistId: string; taskId: string }, { rejectWithValue }) => {
                try {
                    await tasksApi.deleteTask(args)
                    return args
                } catch (error) {
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
        changeTaskStatusTC: create.asyncThunk(
            async (task: DomainTask, { rejectWithValue }) => {
                try {
                    const model: UpdateTaskModel = {
                        status: task.status,
                        description: task.description,
                        title: task.title,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                    }
                    const res = await tasksApi.changeTaskStatus({
                        todolistId: task.todoListId,
                        taskId: task.id,
                        model,
                    })
                    return task
                } catch (error) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state.tasksState[action.payload.todoListId].find(
                        (task) => task.id === action.payload.id,
                    )
                    if (task) {
                        task.status = action.payload.status
                    }
                },
            },
        ),
        changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
            const task = state.tasksState[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        }),
        deleteAllTasksAC: create.reducer<{ id: string }>((state, action) => {
            state.tasksState[action.payload.id] = []
        }),
    }),
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistAC, (state, action) => {
                state.tasksState[action.payload.id] = []
            })
            .addCase(deleteTodolistAC, (state, action) => {
                delete state.tasksState[action.payload.id]
            })
    },
})

export const { selectTasks } = tasksSlice.selectors
export const { deleteTaskTC, changeTaskStatusTC, changeTaskTitleAC, deleteAllTasksAC, fetchTasksTC, createTaskTC } =
    tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksType = Record<string, DomainTask[]>
