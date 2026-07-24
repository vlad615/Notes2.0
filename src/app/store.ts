import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer, tasksReducer } from '../features/todolists/model'
import { appReducer } from './app-slice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
