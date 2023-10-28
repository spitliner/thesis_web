import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AuthResponse, LoginUser, RegisterUser} from "@features/auth/type.ts";

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/auth' }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginUser>({
            query: (body) => ({
                url: '/login',
                method: "POST",
                body
            }),
            transformResponse: (response: {token: string, data: AuthResponse} ) => response.data,
        }),
        register: builder.mutation<AuthResponse, RegisterUser>({
            query: (body) => ({
                url: '/register',
                method: "POST",
                body: body
            }),
            transformResponse: (response: {token: string, data: AuthResponse} ) => response.data,
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = authApi
