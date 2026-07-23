import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { todolistsReducer, tasksReducer } from '../features/todolists/model'
import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    todoLists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

;(window as any).store = store
