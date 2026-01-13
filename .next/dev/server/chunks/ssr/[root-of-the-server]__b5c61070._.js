module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/redux/services/baseApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "baseApi",
    ()=>baseApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:4000/api") || 'http://localhost:4000/api';
const baseApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: 'api',
    baseQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
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
}),
"[project]/src/redux/slices/authSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearError",
    ()=>clearError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "logout",
    ()=>logout,
    "selectAuth",
    ()=>selectAuth,
    "selectIsAuthenticated",
    ()=>selectIsAuthenticated,
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
    ()=>updateBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
// Initial state
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
};
// Get initial state from localStorage if available (client-side only)
const getInitialState = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return initialState;
};
// Auth slice
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
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
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        },
        // Logout user
        logout: (state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            // Clear localStorage
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
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
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
            }
        }
    },
    extraReducers: (builder)=>{
        // This is where you can handle async thunks if needed
        builder.addCase('auth/reset', ()=>initialState);
    }
});
const { setCredentials, logout, clearError, setLoading, setError, updateBalance } = authSlice.actions;
const selectAuth = (state)=>state.auth;
const selectUser = (state)=>state.auth.user;
const selectToken = (state)=>state.auth.token;
const selectIsAuthenticated = (state)=>state.auth.isAuthenticated;
const selectUserRole = (state)=>state.auth.user?.role;
const selectUserBalance = (state)=>state.auth.user?.balance;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/src/redux/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/services/baseApi.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/slices/authSlice.ts [app-ssr] (ecmascript)");
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseApi"].reducer,
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types from redux-persist and RTK Query
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE'
                ]
            }
        }).concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$services$2f$baseApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseApi"].middleware),
    devTools: ("TURBOPACK compile-time value", "development") !== 'production'
});
// Enable refetchOnFocus/refetchOnReconnect for RTK Query
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setupListeners"])(store.dispatch);
}),
"[project]/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
const API_URL = ("TURBOPACK compile-time value", "http://localhost:4000/api") || 'http://localhost:4000/api';
class ApiClient {
    async request(endpoint, options = {}) {
        const url = `${API_URL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            credentials: 'include'
        };
        const response = await fetch(url, config);
        if (!response.ok) {
            const error = await response.json().catch(()=>({
                    message: 'An error occurred'
                }));
            throw new Error(error.message || 'Request failed');
        }
        return response.json();
    }
    // Auth endpoints
    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }
    async register(credentials) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }
    async logout() {
        return this.request('/auth/logout', {
            method: 'POST'
        });
    }
    async getMe() {
        return this.request('/auth/me');
    }
    // Deposit endpoints
    async getDepositAddresses() {
        return this.request('/deposits/addresses');
    }
    async createDeposit(deposit) {
        return this.request('/deposits', {
            method: 'POST',
            body: JSON.stringify(deposit)
        });
    }
    async getMyDeposits(params) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/deposits/my-deposits${queryString ? `?${queryString}` : ''}`);
    }
    // Card endpoints
    async createCard(spendingLimit) {
        return this.request('/cards', {
            method: 'POST',
            body: JSON.stringify({
                spendingLimit
            })
        });
    }
    async getMyCards() {
        return this.request('/cards');
    }
    async loadCard(cardId, amount) {
        return this.request(`/cards/${cardId}/load`, {
            method: 'POST',
            body: JSON.stringify({
                amount
            })
        });
    }
    async freezeCard(cardId) {
        return this.request(`/cards/${cardId}/freeze`, {
            method: 'PATCH'
        });
    }
    async terminateCard(cardId) {
        return this.request(`/cards/${cardId}/terminate`, {
            method: 'PATCH'
        });
    }
    // Transaction endpoints
    async getMyTransactions(params) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/transactions${queryString ? `?${queryString}` : ''}`);
    }
    async getDashboardStats() {
        return this.request('/transactions/stats');
    }
    // Admin endpoints
    async getAdminDashboardStats() {
        return this.request('/admin/dashboard');
    }
    async getAdminUsers(params) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/admin/users${queryString ? `?${queryString}` : ''}`);
    }
    async updateUserStatus(userId, isActive) {
        return this.request(`/admin/users/${userId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({
                isActive
            })
        });
    }
    async updateUserBalance(userId, amount, reason) {
        return this.request(`/admin/users/${userId}/balance`, {
            method: 'POST',
            body: JSON.stringify({
                amount,
                reason
            })
        });
    }
    async getPendingDeposits(params) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/admin/deposits/pending${queryString ? `?${queryString}` : ''}`);
    }
    async approveDeposit(depositId, usdAmount) {
        return this.request(`/admin/deposits/${depositId}/approve`, {
            method: 'PATCH',
            body: JSON.stringify({
                usdAmount
            })
        });
    }
    async rejectDeposit(depositId, reason) {
        return this.request(`/admin/deposits/${depositId}/reject`, {
            method: 'PATCH',
            body: JSON.stringify({
                reason
            })
        });
    }
    async getAdminSettings() {
        return this.request('/admin/settings');
    }
    async updateAdminSettings(settings) {
        return this.request('/admin/settings', {
            method: 'PUT',
            body: JSON.stringify(settings)
        });
    }
}
const api = new ApiClient();
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const refreshUser = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getMe();
            if (response.success && response.data) {
                setUser({
                    id: response.data.id,
                    email: response.data.email,
                    fullName: response.data.fullName,
                    role: response.data.role,
                    balance: response.data.balance,
                    isActive: response.data.isActive,
                    isEmailVerified: response.data.isEmailVerified
                });
            }
        } catch (error) {
            setUser(null);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refreshUser();
    }, []);
    const login = async (email, password)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].login({
            email,
            password
        });
        if (response.success && response.user) {
            setUser(response.user);
            if (response.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        }
    };
    const register = async (email, password, fullName)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].register({
            email,
            password,
            fullName
        });
        if (response.success && response.user) {
            setUser(response.user);
            router.push('/dashboard');
        }
    };
    const logout = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].logout();
        setUser(null);
        router.push('/');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            login,
            register,
            logout,
            refreshUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
}),
"[project]/src/components/Providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/Providers.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Providers.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b5c61070._.js.map