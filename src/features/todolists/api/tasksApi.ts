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
            async onQueryStarted({ todolistId, taskId }, { dispatch, queryFulfilled, getState }) {
                const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')

                let patchResults: any[] = []
                cachedArgsForQuery.forEach(({ params }) => {
                    patchResults.push(
                        dispatch(
                            tasksApi.util.updateQueryData(
                                'getTasks',
                                { todolistId, params: { page: params.page } },
                                (state) => {
                                    const index = state.items.findIndex((task) => task.id === taskId)
                                    if (index !== -1) {
                                        state.items.splice(index, 1)
                                    }
                                },
                            ),
                        ),
                    )
                })
                try {
                    await queryFulfilled
                } catch {
                    patchResults.forEach((patchResult) => {
                        patchResult.undo()
                    })
                }
            },
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
            async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
                const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')

                let patchResults: any[] = []
                cachedArgsForQuery.forEach(({ params }) => {
                    patchResults.push(
                        dispatch(
                            tasksApi.util.updateQueryData(
                                'getTasks',
                                { todolistId, params: { page: params.page } },
                                (state) => {
                                    const index = state.items.findIndex((task) => task.id === taskId)
                                    if (index !== -1) {
                                        state.items[index] = { ...state.items[index], ...model }
                                    }
                                },
                            ),
                        ),
                    )
                })
                try {
                    await queryFulfilled
                } catch {
                    patchResults.forEach((patchResult) => {
                        patchResult.undo()
                    })
                }
            },
            invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
        }),
        reorderTask: build.mutation<
            BaseResponse<{ item: DomainTask }>,
            { todolistId: string; taskId: string; after: string }
        >({
            query: ({ todolistId, taskId, after }) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}/reorder`,
                method: 'PUT',
                body: { after },
            }),
            invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
        }),
    }),
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useReorderTaskMutation,
} = tasksApi
