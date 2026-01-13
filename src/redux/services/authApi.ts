import { baseApi } from './baseApi';

// Auth interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
    balance: number;
    isActive?: boolean;
    isEmailVerified?: boolean;
  };
}

export interface AuthResponseData {
  success: boolean;
  data: {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
    balance: number;
    isActive?: boolean;
    isEmailVerified?: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// Auth API service
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register new user
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => response,
    }),

    // Login user
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => response,
    }),

    // Logout user
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // Get current user
    getCurrentUser: builder.query<AuthResponseData, void>({
      query: () => '/auth/me',
      transformResponse: (response: AuthResponseData) => response,
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;

// Export the logout mutation trigger for use in Redux thunks
export const logout = authApi.endpoints.logout.initiate;
