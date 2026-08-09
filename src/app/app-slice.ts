import type { ErrorStatus, RequestStatus } from '@/commun/types/BaseResponse'
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'dark' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as ErrorStatus,
    },
    selectors: {
        selectTheme: (state) => state.themeMode,
        selectStatus: (state) => state.status,
        selectError: (state) => state.error,
    },
    reducers: (create) => ({
        changeThemeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        changeRequestStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        changeErrorStatus: create.reducer<{ error: ErrorStatus }>((state, action) => {
            state.error = action.payload.error
        }),
    }),
})

export const { changeThemeAC, changeRequestStatus, changeErrorStatus } = appSlice.actions
export const { selectTheme, selectStatus, selectError } = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light'
