import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RegisterRequest, RegisterResponse, Users } from '../types/api';

const BASE_URL = 'https://reqres.in/';

export const api = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    signUp: builder.mutation<RegisterResponse, RegisterRequest>({
      query: ({ email, password }) => ({
        url: '/api/register',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Users'],
    }),
    logIn: builder.mutation<RegisterResponse, RegisterRequest>({
      query: ({ email, password }) => ({
        url: '/api/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Users'],
    }),
    getUsers: builder.query<Users, void>({
      query: () => ({
        url: '/api/users?per_page=8',
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation, useGetUsersQuery } = api;
