import { baseApi } from './baseApi';

// Admin interfaces
export interface User {
  _id: string;
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  balance: number;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  data: {
    users: User[];
    total: number;
    limit: number;
    skip: number;
  };
}

export interface UsersQueryParams {
  search?: string;
  status?: string;
  limit?: number;
  skip?: number;
}

// Admin API service
export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users (paginated)
    getAllUsers: builder.query<UsersResponse, UsersQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.search) queryParams.append('search', params.search);
        if (params.status) queryParams.append('status', params.status);
        queryParams.append('limit', (params.limit || 50).toString());
        queryParams.append('skip', (params.skip || 0).toString());

        return {
          url: `/admin/users?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),

    // Get user by ID
    getUserById: builder.query<{ success: boolean; data: User }, string>({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),

    // Update user role
    updateUserRole: builder.mutation<
      { success: boolean; data: User },
      { userId: string; role: 'user' | 'admin' }
    >({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: (result, error, { userId }) => [
        'User',
        { type: 'User', id: userId },
      ],
    }),

    // Toggle user active status
    toggleUserStatus: builder.mutation<
      { success: boolean; data: User },
      { userId: string; isActive: boolean }
    >({
      query: ({ userId, isActive }) => ({
        url: `/admin/users/${userId}/status`,
        method: 'PATCH',
        body: { isActive },
      }),
      invalidatesTags: (result, error, { userId }) => [
        'User',
        { type: 'User', id: userId },
      ],
    }),

    // Delete user
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
  useToggleUserStatusMutation,
  useDeleteUserMutation,
} = adminApi;
