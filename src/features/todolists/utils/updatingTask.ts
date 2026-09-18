import { tasksApi } from '../api'
import type { Dispatch } from '@reduxjs/toolkit'

export function updatingTask(todolistId: string, id: string, status: boolean, dispatch: Dispatch) {
    dispatch(
        tasksApi.util.updateQueryData('getTasks', todolistId, (tasks) => {
            const task = tasks.find((task) => task.id === id)
            if (task) {
                task.updating = status
            }
        }) as any,
    )
}
