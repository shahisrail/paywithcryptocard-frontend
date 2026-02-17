import { baseApi } from './baseApi';

// Deposit interfaces
export interface CryptoAddress {
  BTC: string;
  ETH: string;
  USDT_ERC20: string;
  USDT_TRC20: string;
  XMR: string;
}

export interface DepositAddressResponse {
  success: boolean;
  data: CryptoAddress & {
    minimumDeposit?: number;
  };
}

export interface CreateDepositRequest {
  currency: 'BTC' | 'ETH' | 'USDT_ERC20' | 'USDT_TRC20' | 'XMR';
  amount: number;
  txHash?: string;
  walletAddress: string;
}

export interface Deposit {
  _id: string;
  userId: string;
  currency: 'BTC' | 'ETH' | 'USDT_ERC20' | 'USDT_TRC20' | 'XMR';
  amount: number;
  txHash?: string;
  walletAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  usdAmount?: number;
}

export interface DepositsResponse {
  success: boolean;
  data: {
    deposits: Deposit[];
    total: number;
  };
}

export interface MyDepositsQueryParams {
  status?: string;
  limit?: number;
  skip?: number;
}

// Deposit API service
export const depositApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get deposit addresses
    getDepositAddresses: builder.query<DepositAddressResponse, void>({
      query: () => '/deposits/addresses',
      providesTags: ['Deposit'],
    }),

    // Create deposit request
    createDeposit: builder.mutation<
      { success: boolean; message: string; data: Deposit },
      CreateDepositRequest
    >({
      query: (data) => ({
        url: '/deposits',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Deposit', 'Transaction'],
    }),

    // Get my deposits
    getMyDeposits: builder.query<DepositsResponse, MyDepositsQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status);
        queryParams.append('limit', (params.limit || 50).toString());
        queryParams.append('skip', (params.skip || 0).toString());

        return {
          url: `/deposits/my-deposits?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Deposit'],
    }),

    // Get deposit by ID
    getDepositById: builder.query<{ success: boolean; data: Deposit }, string>({
      query: (depositId) => `/deposits/${depositId}`,
      providesTags: (result, error, depositId) => [
        { type: 'Deposit', id: depositId },
      ],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetDepositAddressesQuery,
  useCreateDepositMutation,
  useGetMyDepositsQuery,
  useGetDepositByIdQuery,
} = depositApi;
