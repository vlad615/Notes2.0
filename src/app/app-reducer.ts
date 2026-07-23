import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const changeThemeAC = createAction<{ themeMode: ThemeMode }>('appreducer/changeTheme')

export const appReducer = createReducer(initialState, (builder) => {
    builder.addCase(changeThemeAC, (state, action) => {
        state.themeMode = action.payload.themeMode
    })
})

export type ThemeMode = 'dark' | 'light'
