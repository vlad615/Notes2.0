import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { createTodolistAC, deleteTodolistAC } from '../list/todolists-reducer'

export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = Record<string, TaskProps[]>
const initialState: TasksType = {}

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTaskAC')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTaskAC')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string }>('tasks/changeTaskStatusAC')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitleAC')
export const deleteAllTasksAC = createAction<{ id: string }>('tasks/deleteAllTasksAC')

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({ title: action.payload.title, isDone: false, id: nanoid() })
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
      if (task) {
        task.isDone = !task.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
      if (task) {
        task.title = action.payload.title
      }
    })
    .addCase(deleteAllTasksAC, (state, action) => { state[action.payload.id] = [] })
    .addCase(createTodolistAC, (state, action) => { state[action.payload.id] = [] })
    .addCase(deleteTodolistAC, (state, action) => { delete state[action.payload.id] })
})

