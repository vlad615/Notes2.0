import { baseApi } from '@/commun/instance'
import type { BaseResponse } from '@/commun/types/'
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
            async onQueryStarted({ id, title }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
                        const todo = state.find((todo) => todo.id === id)
                        if (todo) {
                            todo.title = title
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['Todolist'],
        }),
        deleteTodolist: build.mutation<BaseResponse, string>({
            query: (id) => ({
                url: `/todo-lists/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
                        const index = state.findIndex((todolist) => todolist.id === id)
                        if (index !== -1) {
                            state.splice(index, 1)
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['Todolist'],
        }),
        reorderTodolist: build.mutation<BaseResponse, { todolistId: string; after: string }>({
            query: ({ todolistId, after }) => ({
                url: `todo-lists/${todolistId}/reorder`,
                method: 'PUT',
                body: { after },
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
    useReorderTodolistMutation,
} = todolistsApi
