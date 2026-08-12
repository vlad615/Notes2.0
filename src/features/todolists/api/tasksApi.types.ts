import type { TaskStatus, TaskPriority } from '@/commun/enums/enums'

export type DomainTask = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    updating: boolean
}

export type UpdateTaskModel = Omit<DomainTask, 'id' | 'todoListId' | 'order' | 'addedDate' | 'updating'>

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}
