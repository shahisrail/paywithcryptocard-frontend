import { baseApi } from './baseApi';

// Card interfaces
export interface Card {
  _id: string;
  userId: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
  balance: number;
  status: 'active' | 'frozen' | 'terminated';
  spendingLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardRequest {
  cardHolder: string;
  spendingLimit?: number;
}

export interface LoadCardRequest {
  amount: number;
}

export interface CardsResponse {
  success: boolean;
  data: Card[];
}

// Card API service
export const cardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all user cards
    getMyCards: builder.query<CardsResponse, void>({
      query: () => '/cards',
      providesTags: ['Card'],
    }),

    // Get card by ID
    getCardById: builder.query<{ success: boolean; data: Card }, string>({
      query: (cardId) => `/cards/${cardId}`,
      providesTags: (result, error, cardId) => [{ type: 'Card', id: cardId }],
    }),

    // Create new card
    createCard: builder.mutation<
      { success: boolean; message: string; data: Card },
      CreateCardRequest
    >({
      query: (data) => ({
        url: '/cards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Card'],
    }),

    // Load card with funds
    loadCard: builder.mutation<
      { success: boolean; message: string; data: Card },
      { cardId: string; amount: number }
    >({
      query: ({ cardId, amount }) => ({
        url: `/cards/${cardId}/load`,
        method: 'POST',
        body: { amount },
      }),
      invalidatesTags: (result, error, { cardId }) => [
        'Card',
        { type: 'Card', id: cardId },
      ],
    }),

    // Freeze card
    freezeCard: builder.mutation<
      { success: boolean; message: string; data: Card },
      string
    >({
      query: (cardId) => ({
        url: `/cards/${cardId}/freeze`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, cardId) => [
        'Card',
        { type: 'Card', id: cardId },
      ],
    }),

    // Terminate card
    terminateCard: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (cardId) => ({
        url: `/cards/${cardId}/terminate`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, cardId) => [
        'Card',
        { type: 'Card', id: cardId },
      ],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetMyCardsQuery,
  useGetCardByIdQuery,
  useCreateCardMutation,
  useLoadCardMutation,
  useFreezeCardMutation,
  useTerminateCardMutation,
} = cardApi;
