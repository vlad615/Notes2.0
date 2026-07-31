import { instance } from '@/commun/instance'
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import type { BaseResponse } from '@/commun/types/BaseResponse'

export const tasksApi = {
    getTasks(todolistid: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistid}/tasks`)
    },

    createTask(payload: { todolistId: string; title: string }) {
        return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${payload.todolistId}/tasks`, {
            title: payload.title,
        })
    },

    deleteTask(payload: { todolistId: string; taskId: string }) {
        return instance.delete<BaseResponse>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
    },

    updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
        return instance.put<BaseResponse<{ item: DomainTask }>>(
            `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
            payload.model,
        )
    },

    deleteTasks: async (
        todolistId: string,
        tasks: DomainTask[],
        // predicate: (task: DomainTask) => boolean = () => true,
    ) => {
        // const tasksToDelete = tasks.filter(predicate)
        const deletePromises = tasks.map((task) => tasksApi.deleteTask({ todolistId, taskId: task.id }))

        const response = await Promise.allSettled(deletePromises)
        console.log(response)
        let tasksIds: string[] = []
        response.forEach((res) => {
            if (res.status === 'fulfilled') {
                const id = res.value.config.url?.split('/').pop()
                id && tasksIds.push(id)
            }
        })
        console.log(tasksIds)
        return tasksIds
    },
}
