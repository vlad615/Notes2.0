import { instance } from '@/commun/instance'
import type { LoginInputs } from '../lib'
import type { BaseResponse } from '@/commun/types/BaseResponse'

export const authApi = {
    login(payload: LoginInputs) {
        return instance.post<BaseResponse<{ userId: number; token: string }>>('/auth/login', payload)
    },
    logout() {
        return instance.delete<BaseResponse>('/auth/login')
    },
    me() {
        return instance.get<BaseResponse<{ id: number; email: string; login: string }>>('/auth/me')
    },
}
