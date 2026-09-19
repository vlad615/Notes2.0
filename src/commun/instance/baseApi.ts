import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleError } from '../utils/handleErrors'

export const baseApi = createApi({
    reducerPath: 'todolistsApi',
    tagTypes: ['Todolist', 'Task'],
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                'API-KEY': import.meta.env.VITE_API_KEY,
            },
            prepareHeaders: (headers) => {
                headers.set('Authorization', `Bearer ${localStorage.getItem('auth-token')}`)
            },
        })(args, api, extraOptions)

        handleError(api, result)

        return result
    },
    endpoints: () => ({}),
})
