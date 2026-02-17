import { baseApi } from './baseApi';

// Transaction interfaces
export interface Transaction {
  _id: string;
  userId: string;
  cardId?: string;
  type: 'deposit' | 'card_create' | 'card_load' | 'purchase' | 'withdrawal';
  amount: number;
  balance: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface TransactionsResponse {
  success: boolean;
  data: {
    transactions: Transaction[];
    total: number;
  };
}

export interface DashboardStatsResponse {
  success: boolean;
  data: {
    totalBalance: number;
    totalCards: number;
    totalSpent: number;
    totalDeposits: number;
    recentTransactions: Transaction[];
  };
}

export interface TransactionsQueryParams {
  type?: string;
  status?: string;
  limit?: number;
  skip?: number;
}

// Transaction API service
export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get my transactions
    getMyTransactions: builder.query<TransactionsResponse, TransactionsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.type) queryParams.append('type', params.type);
        if (params.status) queryParams.append('status', params.status);
        queryParams.append('limit', (params.limit || 50).toString());
        queryParams.append('skip', (params.skip || 0).toString());

        return {
          url: `/transactions?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Transaction'],
    }),

    // Get transaction by ID
    getTransactionById: builder.query<{ success: boolean; data: Transaction }, string>({
      query: (transactionId) => `/transactions/${transactionId}`,
      providesTags: (result, error, transactionId) => [
        { type: 'Transaction', id: transactionId },
      ],
    }),

    // Get dashboard stats
    getDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => '/transactions/stats',
      providesTags: ['Transaction', 'Card'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetMyTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetDashboardStatsQuery,
} = transactionApi;
