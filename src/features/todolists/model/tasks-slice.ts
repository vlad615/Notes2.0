import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { createTodolistAC, deleteTodolistAC } from './todolists-slice'
import { tasksApi, type DomainTask } from '../api'
import { TaskPriority, TaskStatus } from '@/commun/enums'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasksState: {} as TasksType,
    },
    selectors: {
        selectTasks: (state) => state.tasksState,
    },
    reducers: (create) => ({
        createTaskAC: create.preparedReducer(
            (payload: { todolistId: string; title: string }) => {
                const newTask: DomainTask = {
                    id: nanoid(),
                    title: payload.title,
                    status: TaskStatus.Active,
                    description: '',
                    priority: TaskPriority.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: payload.todolistId,
                    order: 0,
                    addedDate: new Date().toISOString(),
                }
                return { payload: { todolistId: payload.todolistId, newTask } }
            },
            (state, action) => {
                state.tasksState[action.payload.todolistId].unshift(action.payload.newTask)
            },
        ),
        deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
            const index = state.tasksState[action.payload.todolistId].findIndex(
                (task) => task.id === action.payload.taskId,
            )
            if (index !== -1) {
                state.tasksState[action.payload.todolistId].splice(index, 1)
            }
        }),
        changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; status: TaskStatus }>(
            (state, action) => {
                const task = state.tasksState[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
                if (task) {
                    task.status = action.payload.status
                }
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
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                if (typeof action.payload === 'string') {
                    state.tasksState[action.payload] = []
                } else {
                    state.tasksState[action.payload.items[0].todoListId] = action.payload.items
                }
            })
            .addCase(createTaskTC.fulfilled, (state, action) => {
                state.tasksState[action.payload.data.item.todoListId].unshift(action.payload.data.item)
            })
    },
})

export const fetchTasksTC = createAsyncThunk(`${tasksSlice.name}/fetchTasks`, async (todolistId: string, {}) => {
    const response = await tasksApi.getTasks(todolistId)
    if (!response.data.items.length) {
        return todolistId
    }
    return response.data
})

export const createTaskTC = createAsyncThunk(
    `${tasksSlice.name}/createTask`,
    async (payload: { todolistId: string; title: string }, {}) => {
        const response = await tasksApi.createTask(payload)
        return response.data
    },
)

export const { selectTasks } = tasksSlice.selectors
export const { createTaskAC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteAllTasksAC } =
    tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TasksType = Record<string, DomainTask[]>
