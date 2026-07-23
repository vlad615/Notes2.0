import type { RootState } from '@/app/store'
import type { ListType } from './todolists-reducer'

export const selectLists = (state: RootState): ListType[] => state.todoLists
