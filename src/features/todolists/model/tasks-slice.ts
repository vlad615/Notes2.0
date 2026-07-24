import { createSlice } from '@reduxjs/toolkit'
import { createTodolistAC, deleteTodolistAC } from './todolists-slice'

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
            (todolistId: string, title: string) => {
                const newTask: TaskProps = { id: crypto.randomUUID(), title, isDone: false }
                return { payload: { todolistId, newTask } }
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
        changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
            const task = state.tasksState[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
            if (task) {
                task.isDone = !task.isDone
            }
        }),
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
export const { createTaskAC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteAllTasksAC } =
    tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = Record<string, TaskProps[]>
