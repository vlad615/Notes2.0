import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import type { ListType, Filter } from "../../layout/todoList/components/CardList"


const initialState: ListType[] = []

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => { return { payload: { id: nanoid(), title } } })
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{ id: string, filter: Filter }>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => { state.unshift({ id: action.payload.id, title: action.payload.title, filter: 'all' }) })
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find(todolist => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    })
})
