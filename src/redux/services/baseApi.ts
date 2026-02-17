import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API URL - change this for different environments
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server-puce-mu.vercel.app/api';

// Create base API slice with common configuration
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux store
      const token = (getState() as any).auth.token;

      // If token exists, add to headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      // Set content type for all requests
      headers.set('accept', 'application/json');

      return headers;
    },
    credentials: 'include', // Include cookies for httpOnly cookie support
  }),
  tagTypes: ['Auth', 'User', 'Card', 'Transaction', 'Admin', 'Deposit'],
  endpoints: () => ({}),
});
