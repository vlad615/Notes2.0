import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { listReducer } from '../model/list/list-reducer'
import { tasksReducer } from '../model/task/task-reducer'

const rootReducer = combineReducers({
    todoLists: listReducer,
    tasks: tasksReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

if (import.meta.env.DEV) {
  (window as any).store = store;
}