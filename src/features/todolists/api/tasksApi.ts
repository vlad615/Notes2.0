import { instance } from '@/commun/instance'
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import type { BaseResponse } from '@/commun/types/BaseResponse'

export const tasksApi = {
    getTasks(todolistid: DomainTask['todoListId']) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistid}/tasks`)
    },

    createTask(payload: { todolistId: DomainTask['todoListId']; title: DomainTask['title'] }) {
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${payload.todolistId}/tasks`, {
            title: payload.title,
        })
    },

    deleteTask(payload: { todolistId: DomainTask['todoListId']; taskId: DomainTask['id'] }) {
        return instance.delete<BaseResponse>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
    },

    changeTaskStatus(payload: {
        todolistId: DomainTask['todoListId']
        taskId: DomainTask['id']
        model: UpdateTaskModel
    }) {
        return instance.put<BaseResponse<{ item: DomainTask }>>(
            `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
            payload.model,
        )
    },

    changeTaskTitle(payload: {
        todolistId: DomainTask['todoListId']
        taskId: DomainTask['id']
        model: UpdateTaskModel
    }) {
        return instance.put<BaseResponse<{ item: DomainTask }>>(
            `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
            payload.model,
        )
    },
}
