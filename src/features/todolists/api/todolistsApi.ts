import { instance } from '@/commun/instance'
import type { Todolist } from './todolistsApi.types'
import type { BaseResponse } from '@/commun/types/BaseResponse'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const _todolistsApi = createApi({
    reducerPath: 'todolistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            return headers
        },
    }),
    endpoints: (build) => ({
        getTodolists: build.query<any[], void>({
            query: () => {
                return { url: '/todo-lists', method: 'GET' }
            },
        }),
    }),
})

export const todolistsApi = {
    getTodoLists() {
        return instance.get<Todolist[]>('/todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', { title })
    },

    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },

    changeTodolistTitle(id: string, title: string) {
        return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
    },
}
