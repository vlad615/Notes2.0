import type { RequestStatus } from '@/commun/types/BaseResponse'
import { z } from 'zod/v4'

export const todolistShema = z.object({
    id: z.string(),
    title: z.string(),
    addedDate: z.string(),
    order: z.number(),
})

export type Todolist = z.infer<typeof todolistShema>

export type ListType = Todolist & {
    filter: Filter
    entityStatus: RequestStatus
}

export type Filter = 'all' | 'active' | 'completed'
