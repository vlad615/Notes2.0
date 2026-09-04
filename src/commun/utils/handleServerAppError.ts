import { changeErrorStatus, changeRequestStatus } from '@/app'
import type { BaseResponse } from '@/commun/types/BaseResponse'
import type { Dispatch } from '@reduxjs/toolkit'

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
    console.log('app error')

    if (data.messages.length) {
        dispatch(changeErrorStatus({ error: data.messages[0] }))
    } else {
        dispatch(changeErrorStatus({ error: 'Some error occurred' }))
    }
    dispatch(changeRequestStatus({ status: 'failed' }))
}
