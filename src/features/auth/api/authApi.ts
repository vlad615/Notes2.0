import { instance } from '@/commun/instance'
import type { LoginInputs } from '../lib'
import type { BaseResponse } from '@/commun/types/BaseResponse'

export const authApi = {
    login(payload: LoginInputs) {
        return instance.post<BaseResponse<{ userId: number }>>('/auth/login', payload)
    },
}
