import { baseApi } from '@/commun/instance'
import type { BaseResponse } from '@/commun/types/BaseResponse'
import type { ListType, Todolist } from './todolistsApi.types'

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<ListType[], void>({
            query: () => '/todo-lists',

            transformResponse: (todolists: ListType[]) => {
                return todolists.map((list) => ({
                    ...list,
                    filter: 'all',
                    entityStatus: 'idle',
                }))
            },
            providesTags: ['Todolist'],
        }),
        addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
            query: (title) => ({
                url: 'todo-lists',
                method: 'POST',
                body: { title },
            }),
            invalidatesTags: ['Todolist'],
        }),
        changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
            query: ({ id, title }) => ({
                url: `/todo-lists/${id}`,
                method: 'PUT',
                body: { id, title },
            }),
            invalidatesTags: ['Todolist'],
        }),
        deleteTodolist: build.mutation<BaseResponse, string>({
            query: (id) => ({
                url: `/todo-lists/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Todolist'],
        }),
    }),
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useChangeTodolistTitleMutation,
    useDeleteTodolistMutation,
} = todolistsApi
