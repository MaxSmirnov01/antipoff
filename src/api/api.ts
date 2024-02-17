import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RegisterRequest, RegisterResponse, Users, UserData, AddUser, UpdateUser } from '../types/api';
import { BASE_URL, SUGN_UP, LOG_IN, LIST_USERS, SINGLE_USER } from './urls';

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
    getUsers: builder.query<Users, number>({
      query: (pageNumber) => ({
        url: `${LIST_USERS}${pageNumber}`,
      }),
      providesTags: ['Users'],
    }),
    getSingleUser: builder.query<UserData, number | null>({
      query: (id) => ({
        url: `${SINGLE_USER}/${id}`,
      }),
      providesTags: ['Users'],
    }),
    // не используется
    addUser: builder.mutation<AddUser, AddUser>({
      query: (body) => ({
        url: `${SINGLE_USER}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    // не используется
    updateUser: builder.mutation<UpdateUser, UpdateUser>({
      query: ({ id, ...body }) => ({
        url: `${SINGLE_USER}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

// на будущее
export const selectUsers = api.endpoints.getUsers.select(1);

export const {
  useSignUpMutation,
  useLogInMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = api;
