import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RegisterRequest, RegisterResponse, Users } from '../types/api';
import { BASE_URL, SUGN_UP, LOG_IN, LIST_USERS } from './urls';

export const api = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    signUp: builder.mutation<RegisterResponse, RegisterRequest>({
      query: ({ email, password }) => ({
        url: SUGN_UP,
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Users'],
    }),
    logIn: builder.mutation<RegisterResponse, RegisterRequest>({
      query: ({ email, password }) => ({
        url: LOG_IN,
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Users'],
    }),
    getUsers: builder.query<Users, number | undefined>({
      query: (pageNumber = 1) => ({
        url: `${LIST_USERS}${pageNumber}`,
      }),
      providesTags: ['Users'],
    }),
  }),
});

// на будущее
export const selectUsers = api.endpoints.getUsers.select(1);

export const { useSignUpMutation, useLogInMutation, useGetUsersQuery } = api;
