import { changeRequestStatus } from '@/app'
import { ResultCode } from '@/commun/enums'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/commun/utils'
import { authApi } from '../api/authApi'
import { AUTH_TOKEN } from '@/commun/constants'
import type { LoginInputs } from '../lib'

export const AuthReducer = createAppSlice({
    name: 'auth',
    initialState: { isLogged: false, login: '' },
    selectors: {
        authSelect: (state) => state.isLogged,
        loginSelect: (state) => state.login,
    },
    reducers: (create) => ({
        initializeAppTC: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const res = await authApi.me()
                    if (res.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        return { isLogged: true, login: res.data.data.login }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLogged = action.payload.isLogged
                    state.login = action.payload.login
                },
            },
        ),
        LoginTC: create.asyncThunk(
            async (args: LoginInputs, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const res = await authApi.login(args)
                    if (res.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        return { isLogged: true }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLogged = action.payload.isLogged
                },
            },
        ),
        LogoutTC: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        localStorage.removeItem(AUTH_TOKEN)
                        return { isLogged: false }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLogged = action.payload.isLogged
                    state.login = ''
                },
            },
        ),
    }),
})

export const { LoginTC, LogoutTC, initializeAppTC } = AuthReducer.actions
export const { authSelect, loginSelect } = AuthReducer.selectors
export const authReducer = AuthReducer.reducer
