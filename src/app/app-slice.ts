import type { ErrorStatus, RequestStatus } from '@/commun/types/BaseResponse'
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: localStorage.getItem('themeMode') === 'dark' ? 'dark' : ('light' as ThemeMode),
        status: 'idle' as RequestStatus,
        error: null as ErrorStatus,
        isLoggedIn: false,
    },
    selectors: {
        selectTheme: (state) => state.themeMode,
        selectStatus: (state) => state.status,
        selectError: (state) => state.error,
        selectIsLoggedIn: (state) => state.isLoggedIn,
    },
    reducers: (create) => ({
        changeThemeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            localStorage.setItem('themeMode', action.payload.themeMode)
            state.themeMode = action.payload.themeMode
        }),
        changeRequestStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        changeErrorStatus: create.reducer<{ error: ErrorStatus }>((state, action) => {
            state.error = action.payload.error
        }),
        setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
    }),
})

export const { changeThemeAC, changeRequestStatus, changeErrorStatus, setIsLoggedInAC } = appSlice.actions
export const { selectTheme, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light'
