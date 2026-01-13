import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../services/authApi';
import { useLogoutMutation } from '../services/authApi';

// Auth state interface
interface AuthState {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
    balance: number;
    isActive?: boolean;
    isEmailVerified?: boolean;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isLoggingOut: false,
  error: null,
};

// Get initial state from localStorage if available (client-side only)
const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        return {
          ...initialState,
          token,
          user,
          isAuthenticated: true,
        };
      } catch (error) {
        // If parsing fails, clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }
  return initialState;
};

// Async thunk for logout with API call
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      // Make direct fetch call to logout API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      // Continue with local logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local state
      dispatch(clearAuthState());
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // Set credentials (called after successful login/register)
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },

    // Clear auth state (called by logoutUser)
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    // Logout user (deprecated - use logoutUser thunk instead)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Update user balance
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.balance = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },

    // Update user data (from /api/auth/me)
    updateUser: (state, action: PayloadAction<AuthState['user']>) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggingOut = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoggingOut = false;
      })
      .addCase('auth/reset', () => initialState);
  },
});

// Export actions
export const {
  setCredentials,
  logout,
  clearAuthState,
  clearError,
  setLoading,
  setError,
  updateBalance,
  updateUser,
} = authSlice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;
export const selectUserBalance = (state: { auth: AuthState }) => state.auth.user?.balance;
export const selectIsLoggingOut = (state: { auth: AuthState }) => state.auth.isLoggingOut;

// Reducer
export default authSlice.reducer;
