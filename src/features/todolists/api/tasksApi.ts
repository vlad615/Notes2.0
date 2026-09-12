import { baseApi, instance } from '@/commun/instance'
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import type { BaseResponse } from '@/commun/types/BaseResponse'

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<DomainTask[], string>({
            query: (todolistId) => `todo-lists/${todolistId}/tasks`,
            transformResponse: (res: GetTasksResponse) => {
                return [...res.items.map((task) => ({ ...task, updating: false }))]
            },
            providesTags: ['Task'],
        }),
        createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
            query: ({ todolistId, title }) => ({
                url: `todo-lists/${todolistId}/tasks`,
                method: 'POST',
                body: title,
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
            query: ({ todolistId, taskId }) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
        updateTask: build.mutation<
            BaseResponse<{ item: DomainTask }>,
            { todolistId: string; taskId: string; model: UpdateTaskModel }
        >({
            query: ({ todolistId, taskId, model }) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'PUT',
                body: model,
            }),
            invalidatesTags: ['Task'],
        }),
    }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
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

    async deleteTasks(todolistId: string, tasks: DomainTask[]) {
        const deletePromises = tasks.map((task) => this.deleteTask({ todolistId, taskId: task.id }))

        const response = await Promise.allSettled(deletePromises)
        let tasksIds: string[] = []
        response.forEach((res) => {
            if (res.status === 'fulfilled') {
                const id = res.value.config.url?.split('/').pop()
                id && tasksIds.push(id)
            }
        })
        return tasksIds
    },
}
