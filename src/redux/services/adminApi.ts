import { baseApi } from './baseApi';

// Admin interfaces
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalBalance: number;
  totalCards: number;
  totalDeposits: number;
  pendingDeposits: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}

export interface PendingDeposit {
  _id: string;
  userId: string;
  user?: {
    fullName: string;
    email: string;
  };
  currency: 'BTC' | 'ETH' | 'USDT_ERC20' | 'USDT_TRC20' | 'XMR';
  amount: number;
  txHash?: string;
  walletAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  usdAmount?: number;
}

export interface PendingDepositsResponse {
  success: boolean;
  data: {
    deposits: PendingDeposit[];
    total: number;
  };
}

export interface AdminSettings {
  cryptoAddresses: {
    btc: string;
    eth: string;
    usdtErc20: string;
    usdtTrc20: string;
    xmr: string;
  };
  minimumDeposit: number;
  cardIssuanceFee: number;
  isActive: boolean;
}

export interface AdminSettingsResponse {
  success: boolean;
  data: AdminSettings;
}
export interface Admin {
  _id: string;
  id: string;
  email: string;
  fullName: string;
  role: 'admin';
  balance: number;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

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

export interface AdminsResponse {
  success: boolean;
  data: {
    admins: Admin[];
    total: number;
    limit: number;
    skip: number;
  };
}

export interface CreateAdminRequest {
  email: string;
  password: string;
  fullName: string;
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

    // Update user balance
    updateUserBalance: builder.mutation<
      { success: boolean; message: string; data: { userId: string; oldBalance: number; newBalance: number; adjustment: number } },
      { id: string; amount: number; reason: string }
    >({
      query: ({ id, amount, reason }) => ({
        url: `/admin/users/${id}/balance`,
        method: 'POST',
        body: { amount, reason },
      }),
      invalidatesTags: ['User', 'Admin'],
    }),

    // Get dashboard stats
    getDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => '/admin/dashboard',
      providesTags: ['User'],
    }),

    // Get pending deposits
    getPendingDeposits: builder.query<PendingDepositsResponse, { limit?: number; skip?: number }>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        queryParams.append('limit', (params?.limit || 20).toString());
        queryParams.append('skip', (params?.skip || 0).toString());

        return {
          url: `/admin/deposits/pending?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Deposit'],
    }),

    // Get all deposits with filters
    getAllDeposits: builder.query<
      PendingDepositsResponse,
      { status?: string; currency?: string; limit?: number; skip?: number }
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status);
        if (params.currency) queryParams.append('currency', params.currency);
        queryParams.append('limit', (params?.limit || 50).toString());
        queryParams.append('skip', (params?.skip || 0).toString());

        return {
          url: `/admin/deposits?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Deposit'],
    }),

    // Approve deposit
    approveDeposit: builder.mutation<
      { success: boolean; message: string; data: any },
      { depositId: string; usdAmount: number }
    >({
      query: ({ depositId, usdAmount }) => ({
        url: `/admin/deposits/${depositId}/approve`,
        method: 'PATCH',
        body: { usdAmount },
      }),
      invalidatesTags: ['Deposit', 'User'],
    }),

    // Reject deposit
    rejectDeposit: builder.mutation<
      { success: boolean; message: string },
      { depositId: string; reason: string }
    >({
      query: ({ depositId, reason }) => ({
        url: `/admin/deposits/${depositId}/reject`,
        method: 'PATCH',
        body: { reason },
      }),
      invalidatesTags: ['Deposit'],
    }),

    // Get admin settings
    getAdminSettings: builder.query<AdminSettingsResponse, void>({
      query: () => '/admin/settings',
      providesTags: ['Admin'],
    }),

    // Update admin settings
    updateAdminSettings: builder.mutation<
      { success: boolean; message: string; data: AdminSettings },
      Partial<AdminSettings>
    >({
      query: (settings) => ({
        url: '/admin/settings',
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: ['Admin'],
    }),

    // Get all transactions
    getAllTransactions: builder.query<
      {
        success: boolean;
        data: {
          transactions: any[];
          total: number;
        };
      },
      {
        type?: string;
        status?: string;
        limit?: number;
        skip?: number;
      }
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.type) queryParams.append('type', params.type);
        if (params.status) queryParams.append('status', params.status);
        queryParams.append('limit', (params?.limit || 50).toString());
        queryParams.append('skip', (params?.skip || 0).toString());

        return {
          url: `/transactions?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Transaction'],
    }),

    // Get all cards
    getAllCards: builder.query<
      {
        success: boolean;
        data: {
          cards: any[];
          total: number;
        };
      },
      {
        status?: string;
        limit?: number;
        skip?: number;
      }
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status);
        queryParams.append('limit', (params?.limit || 50).toString());
        queryParams.append('skip', (params?.skip || 0).toString());

        return {
          url: `/admin/cards?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Card'],
    }),

    // ==================== Admin Management Endpoints ====================

    // Get all admins
    getAllAdmins: builder.query<
      AdminsResponse,
      { search?: string; limit?: number; skip?: number }
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.search) queryParams.append('search', params.search);
        queryParams.append('limit', (params?.limit || 50).toString());
        queryParams.append('skip', (params?.skip || 0).toString());

        return {
          url: `/admin/admins?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Admin'],
    }),

    // Create new admin
    createAdmin: builder.mutation<
      { success: boolean; message: string; data: Admin },
      CreateAdminRequest
    >({
      query: (data) => ({
        url: '/admin/admins',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),

    // Update admin status
    updateAdminStatus: builder.mutation<
      { success: boolean; message: string; data: Admin },
      { id: string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `/admin/admins/${id}/status`,
        method: 'PATCH',
        body: { isActive },
      }),
      invalidatesTags: ['Admin'],
    }),

    // Delete admin
    deleteAdmin: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/admin/admins/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),

    // Update admin password
    updateAdminPassword: builder.mutation<
      { success: boolean; message: string },
      { id: string; newPassword: string }
    >({
      query: ({ id, newPassword }) => ({
        url: `/admin/admins/${id}/password`,
        method: 'PATCH',
        body: { newPassword },
      }),
      invalidatesTags: ['Admin'],
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
  useUpdateUserBalanceMutation,
  useGetDashboardStatsQuery,
  useGetPendingDepositsQuery,
  useGetAllDepositsQuery,
  useApproveDepositMutation,
  useRejectDepositMutation,
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useGetAllTransactionsQuery,
  useGetAllCardsQuery,
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminStatusMutation,
  useDeleteAdminMutation,
  useUpdateAdminPasswordMutation,
} = adminApi;
