import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './app-slice'
import { authReducer } from '@/features/auth'
import { todolistsApi } from '@/features/todolists/api'
import { baseApi } from '@/commun/instance'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
