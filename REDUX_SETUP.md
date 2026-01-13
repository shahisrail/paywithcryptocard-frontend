# Redux + RTK Query Setup Guide

## 📁 Folder Structure

```
src/
├── redux/
│   ├── store.ts              # Main Redux store configuration
│   ├── hooks.ts              # Typed React-Redux hooks
│   ├── services/
│   │   ├── baseApi.ts        # Base API with common configuration
│   │   └── authApi.ts        # Authentication API endpoints
│   └── slices/
│       └── authSlice.ts      # Auth state management
├── components/
│   ├── Providers.tsx         # Redux + Auth providers wrapper
│   └── ProtectedRoute.tsx    # Route protection with role-based access
└── middleware.ts             # Next.js middleware for route protection
```

## 🔧 Environment Configuration

### Development (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Production (`.env.production`)
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## 🚀 API Endpoints

### Authentication
- **POST** `/auth/register` - Register new user
- **POST** `/auth/login` - Login user
- **POST** `/auth/logout` - Logout user
- **GET** `/auth/me` - Get current user

## 📦 Redux State

### Auth State
```typescript
interface AuthState {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
    balance: number;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

## 🔐 Role-Based Access Control

### User Roles
- **user**: Can access `/dashboard` and its sub-routes
- **admin**: Can access `/admin` and its sub-routes

### Protected Routes
- `/dashboard` → Requires authentication + user role
- `/admin` → Requires authentication + admin role
- All other routes → Public access

## 💻 Usage Examples

### Login Page
```typescript
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useLoginMutation } from '@/redux/services/authApi';
import { setCredentials } from '@/redux/slices/authSlice';

const dispatch = useAppDispatch();
const [login] = useLoginMutation();

const handleLogin = async () => {
  const response = await login({ email, password }).unwrap();
  dispatch(setCredentials(response));

  // Redirect based on role
  if (response.user.role === 'admin') {
    router.push('/admin');
  } else {
    router.push('/dashboard');
  }
};
```

### Register Page
```typescript
import { useRegisterMutation } from '@/redux/services/authApi';

const [register] = useRegisterMutation();

const handleRegister = async () => {
  const response = await register({
    email,
    password,
    fullName
  }).unwrap();
  dispatch(setCredentials(response));
};
```

### Check Authentication Status
```typescript
import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated, selectUserRole } from '@/redux/slices/authSlice';

const isAuthenticated = useAppSelector(selectIsAuthenticated);
const userRole = useAppSelector(selectUserRole);
```

### Logout
```typescript
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';

const dispatch = useAppDispatch();
dispatch(logout());
router.push('/login');
```

## 🔄 Adding New API Endpoints

1. Create a new API service in `src/redux/services/`

```typescript
// src/redux/services/cardApi.ts
import { baseApi } from './baseApi';

export const cardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => '/cards',
      providesTags: ['Card'],
    }),
    createCard: builder.mutation({
      query: (data) => ({
        url: '/cards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Card'],
    }),
  }),
});

export const { useGetCardsQuery, useCreateCardMutation } = cardApi;
```

2. Add tag types to `baseApi.ts` if needed:
```typescript
tagTypes: ['Auth', 'User', 'Card', 'Transaction', 'Admin'],
```

## 🛡️ Protected Routes Component

The `ProtectedRoute` component handles:
- Authentication check
- Role verification
- Automatic redirects
- Loading states

Usage:
```typescript
<ProtectedRoute requiredRole="user">
  <YourComponent />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">
  <AdminComponent />
</ProtectedRoute>
```

## 🔄 Token Management

Tokens are automatically:
- Added to request headers via `baseApi`
- Stored in Redux state
- Persisted in localStorage
- Cleared on logout

## 📝 Best Practices

1. **Always use RTK Query hooks** for API calls
2. **Use Redux selectors** to access auth state
3. **Protect routes** using `ProtectedRoute` component
4. **Handle errors** with try-catch blocks
5. **Use TypeScript** for type safety

## 🚦 Testing

1. Start the backend server on port 4000
2. Start the frontend development server
3. Navigate to `/login` or `/register`
4. After login, you'll be redirected based on your role

## 🐛 Troubleshooting

### "Cannot read property of undefined"
- Make sure Redux Provider is wrapping the app
- Check that `store.ts` is configured correctly

### "401 Unauthorized"
- Check if token is being stored in Redux
- Verify API URL in `.env.local`
- Ensure backend is running

### Role-based redirect not working
- Check user role in Redux DevTools
- Verify `ProtectedRoute` is being used in layouts
- Check console for redirect errors
