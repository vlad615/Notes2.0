import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { tasksReducer } from '../model/task/tasks-reducer'
import { todolistsReducer } from '../model/list/todolists-reducer'
import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

(window as any).store = store;
