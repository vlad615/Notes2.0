import { baseApi } from '@/commun/instance'
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import type { BaseResponse } from '@/commun/types/'
import { PAGE_SIZE } from '@/commun/constants'

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
            query: ({ todolistId, params }) => ({
                url: `todo-lists/${todolistId}/tasks`,
                params: { ...params, count: PAGE_SIZE },
            }),
            transformResponse: (res: GetTasksResponse) => {
                return { ...res, items: [...res.items.map((task) => ({ ...task, updating: false }))] }
            },
            providesTags: (_result, _error, { todolistId: id }) => [{ type: 'Task', id: id }],
        }),
        createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
            query: ({ todolistId, title }) => ({
                url: `todo-lists/${todolistId}/tasks`,
                method: 'POST',
                body: { title },
            }),
            invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
        }),
        deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
            query: ({ todolistId, taskId }) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
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
            invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
        }),
    }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
