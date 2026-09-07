import { changeRequestStatus } from '@/app'
import { ResultCode } from '@/commun/enums'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/commun/utils'
import { authApi } from '../api/authApi'
import type { LoginInputs } from '../lib'

export const AuthReducer = createAppSlice({
    name: 'auth',
    initialState: { isLogged: false },
    selectors: { authSelect: (state) => state.isLogged },
    reducers: (create) => ({
        LoginTC: create.asyncThunk(
            async (args: LoginInputs, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(changeRequestStatus({ status: 'loading' }))
                    const response = await authApi.login(args)
                    if (response.data.resultCode === ResultCode.Succeeded) {
                        dispatch(changeRequestStatus({ status: 'succeeded' }))
                        console.log('true')

                        return { isLogged: true }
                    } else {
                        handleServerAppError(response.data, dispatch)
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
    }),
})

export const { LoginTC } = AuthReducer.actions
export const { authSelect } = AuthReducer.selectors
export const authReducer = AuthReducer.reducer
