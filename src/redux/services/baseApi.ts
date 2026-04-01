import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API URL - change this for different environments
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Custom base query with error handling
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux store
    const token = (getState() as any).auth.token;

    // If token exists, add to headers
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // Set content type for all requests
    headers.set("accept", "application/json");

    return headers;
  },
  credentials: "include", // Include cookies for httpOnly cookie support
});

// Wrapper around baseQuery to handle errors
const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);

  // Handle errors
  if (result.error) {
    const { status, data } = result.error;

    // Handle rate limiting (429)
    if (status === 429) {
      return {
        error: {
          status: 429,
          data: {
            success: false,
            message: "Too many requests. Please wait a moment and try again.",
          },
        },
      };
    }

    // Handle network errors / backend not found
    if (status === "FETCH_ERROR" || status === undefined) {
      return {
        error: {
          status: 503,
          data: {
            success: false,
            message:
              "Unable to connect to the server. Please check your internet connection and try again.",
          },
        },
      };
    }

    // Handle timeout errors
    if (status === "TIMEOUT_ERROR") {
      return {
        error: {
          status: 504,
          data: {
            success: false,
            message:
              "Request timeout. The server is taking too long to respond. Please try again.",
          },
        },
      };
    }

    // Handle 401 Unauthorized
    if (status === 401) {
      return {
        error: {
          status: 401,
          data: {
            success: false,
            message: "Your session has expired. Please log in again.",
          },
        },
      };
    }

    // Handle 403 Forbidden
    if (status === 403) {
      return {
        error: {
          status: 403,
          data: {
            success: false,
            message: "You do not have permission to perform this action.",
          },
        },
      };
    }

    // Handle 500 Server Error
    if (status === 500) {
      return {
        error: {
          status: 500,
          data: {
            success: false,
            message:
              "Server error. Please try again later. If the problem persists, contact support.",
          },
        },
      };
    }
  }

  return result;
};

// Create base API slice with common configuration
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Auth", "User", "Card", "Transaction", "Admin", "Deposit"],
  endpoints: () => ({}),
});
