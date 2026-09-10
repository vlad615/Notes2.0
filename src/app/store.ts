import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer, tasksReducer } from '../features/todolists/model'
import { appReducer } from './app-slice'
import { authReducer } from '@/features/auth'
import { todolistsApi } from '@/features/todolists/api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
        [todolistsApi.reducerPath]: todolistsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
