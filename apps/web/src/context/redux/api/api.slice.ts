import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + '/api/',
  }),
  tagTypes: ['Note', 'User'],
  endpoints: () => ({}),
});
