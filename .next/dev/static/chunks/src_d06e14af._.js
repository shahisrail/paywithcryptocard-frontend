(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/redux/services/baseApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "baseApi",
    ()=>baseApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:4000/api") || 'http://localhost:4000/api';
const baseApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: 'api',
    baseQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState })=>{
            // Get token from Redux store
            const token = getState().auth.token;
            // If token exists, add to headers
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            // Set content type for all requests
            headers.set('accept', 'application/json');
            return headers;
        },
        credentials: 'include'
    }),
    tagTypes: [
        'Auth',
        'User',
        'Card',
        'Transaction',
        'Admin'
    ],
    endpoints: ()=>({})
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/services/authApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi,
    "logout",
    ()=>logout,
    "useGetCurrentUserQuery",
    ()=>useGetCurrentUserQuery,
    "useLoginMutation",
    ()=>useLoginMutation,
    "useLogoutMutation",
    ()=>useLogoutMutation,
    "useRegisterMutation",
    ()=>useRegisterMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/services/baseApi.ts [app-client] (ecmascript)");
;
const authApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            // Register new user
            register: builder.mutation({
                query: (credentials)=>({
                        url: '/auth/register',
                        method: 'POST',
                        body: credentials
                    }),
                transformResponse: (response)=>response
            }),
            // Login user
            login: builder.mutation({
                query: (credentials)=>({
                        url: '/auth/login',
                        method: 'POST',
                        body: credentials
                    }),
                transformResponse: (response)=>response
            }),
            // Logout user
            logout: builder.mutation({
                query: ()=>({
                        url: '/auth/logout',
                        method: 'POST'
                    })
            }),
            // Get current user
            getCurrentUser: builder.query({
                query: ()=>'/auth/me',
                transformResponse: (response)=>response,
                providesTags: [
                    'User'
                ]
            })
        }),
    overrideExisting: false
});
const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } = authApi;
const logout = authApi.endpoints.logout.initiate;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/slices/authSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAuthState",
    ()=>clearAuthState,
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "logout",
    ()=>logout,
    "logoutUser",
    ()=>logoutUser,
    "selectAuth",
    ()=>selectAuth,
    "selectIsAuthenticated",
    ()=>selectIsAuthenticated,
    "selectIsLoggingOut",
    ()=>selectIsLoggingOut,
    "selectToken",
    ()=>selectToken,
    "selectUser",
    ()=>selectUser,
    "selectUserBalance",
    ()=>selectUserBalance,
    "selectUserRole",
    ()=>selectUserRole,
    "setCredentials",
    ()=>setCredentials,
    "setError",
    ()=>setError,
    "setLoading",
    ()=>setLoading,
    "updateBalance",
    ()=>updateBalance,
    "updateUser",
    ()=>updateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/services/authApi.ts [app-client] (ecmascript)");
;
;
// Initial state
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    isLoggingOut: false,
    error: null
};
// Get initial state from localStorage if available (client-side only)
const getInitialState = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                return {
                    ...initialState,
                    token,
                    user,
                    isAuthenticated: true
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
const logoutUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/logoutUser', async (_, { dispatch })=>{
    try {
        // Call logout API
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"])().unwrap();
    } catch (error) {
        // Continue with local logout even if API call fails
        console.error('Logout API call failed:', error);
    } finally{
        // Always clear local state
        dispatch(clearAuthState());
    }
});
// Auth slice
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        // Set credentials (called after successful login/register)
        setCredentials: (state, action)=>{
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;
            // Store in localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        // Clear auth state (called by logoutUser)
        clearAuthState: (state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            // Clear localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        // Logout user (deprecated - use logoutUser thunk instead)
        logout: (state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            // Clear localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
        // Clear error
        clearError: (state)=>{
            state.error = null;
        },
        // Set loading state
        setLoading: (state, action)=>{
            state.isLoading = action.payload;
        },
        // Set error
        setError: (state, action)=>{
            state.error = action.payload;
            state.isLoading = false;
        },
        // Update user balance
        updateBalance: (state, action)=>{
            if (state.user) {
                state.user.balance = action.payload;
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem('user', JSON.stringify(state.user));
                }
            }
        },
        // Update user data (from /api/auth/me)
        updateUser: (state, action)=>{
            if (action.payload) {
                state.user = action.payload;
                state.isAuthenticated = true;
                if ("TURBOPACK compile-time truthy", 1) {
                    localStorage.setItem('user', JSON.stringify(action.payload));
                }
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(logoutUser.pending, (state)=>{
            state.isLoggingOut = true;
        }).addCase(logoutUser.fulfilled, (state)=>{
            state.isLoggingOut = false;
        }).addCase(logoutUser.rejected, (state)=>{
            state.isLoggingOut = false;
        }).addCase('auth/reset', ()=>initialState);
    }
});
const { setCredentials, logout, clearAuthState, clearError, setLoading, setError, updateBalance, updateUser } = authSlice.actions;
const selectAuth = (state)=>state.auth;
const selectUser = (state)=>state.auth.user;
const selectToken = (state)=>state.auth.token;
const selectIsAuthenticated = (state)=>state.auth.isAuthenticated;
const selectUserRole = (state)=>state.auth.user?.role;
const selectUserBalance = (state)=>state.auth.user?.balance;
const selectIsLoggingOut = (state)=>state.auth.isLoggingOut;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/services/baseApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/slices/authSlice.ts [app-client] (ecmascript)");
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].reducer,
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types from redux-persist and RTK Query
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE'
                ]
            }
        }).concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].middleware),
    devTools: ("TURBOPACK compile-time value", "development") !== 'production'
});
// Enable refetchOnFocus/refetchOnReconnect for RTK Query
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupListeners"])(store.dispatch);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/store.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/Providers.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_d06e14af._.js.map