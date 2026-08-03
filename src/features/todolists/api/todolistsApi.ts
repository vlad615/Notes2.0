import { instance } from '@/commun/instance'
import type { Todolist } from './todolistsApi.types'
import type { BaseResponse } from '@/commun/types/BaseResponse'

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
