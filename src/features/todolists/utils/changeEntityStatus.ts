import type { RequestStatus } from '@/commun/types/'
import { todolistsApi } from '../api'
import type { Dispatch } from '@reduxjs/toolkit'

export function changeEntityStatus(id: string, status: RequestStatus, dispatch: Dispatch) {
    dispatch(
        todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
            const todolist = todolists.find((todolist) => todolist.id === id)
            if (todolist) {
                todolist.entityStatus = status
            }
        }) as any,
    )
}
