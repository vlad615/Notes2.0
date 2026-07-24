import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'dark' as ThemeMode,
    },
    selectors: {
        selectTheme: (state) => state.themeMode,
    },
    reducers: (create) => ({
        changeThemeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
    }),
})

export const { changeThemeAC } = appSlice.actions
export const { selectTheme } = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light'
