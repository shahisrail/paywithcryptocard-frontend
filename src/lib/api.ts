const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
}

interface DepositRequest {
  currency: 'BTC' | 'ETH' | 'USDT_ERC20' | 'USDT_TRC20' | 'XMR';
  amount: number;
  txHash?: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async login(credentials: LoginCredentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(credentials: RegisterCredentials) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // Deposit endpoints
  async getDepositAddresses() {
    return this.request('/deposits/addresses');
  }

  async createDeposit(deposit: DepositRequest) {
    return this.request('/deposits', {
      method: 'POST',
      body: JSON.stringify(deposit),
    });
  }

  async getMyDeposits(params?: { status?: string; limit?: number; skip?: number }) {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(`/deposits/my-deposits${queryString ? `?${queryString}` : ''}`);
  }

  // Card endpoints
  async createCard(spendingLimit?: number) {
    return this.request('/cards', {
      method: 'POST',
      body: JSON.stringify({ spendingLimit }),
    });
  }

  async getMyCards() {
    return this.request('/cards');
  }

  async loadCard(cardId: string, amount: number) {
    return this.request(`/cards/${cardId}/load`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  async freezeCard(cardId: string) {
    return this.request(`/cards/${cardId}/freeze`, {
      method: 'PATCH',
    });
  }

  async terminateCard(cardId: string) {
    return this.request(`/cards/${cardId}/terminate`, {
      method: 'PATCH',
    });
  }

  // Transaction endpoints
  async getMyTransactions(params?: {
    type?: string;
    status?: string;
    limit?: number;
    skip?: number;
  }) {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(`/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async getDashboardStats() {
    return this.request('/transactions/stats');
  }

  // Admin endpoints
  async getAdminDashboardStats() {
    return this.request('/admin/dashboard');
  }

  async getAdminUsers(params?: { search?: string; status?: string; limit?: number; skip?: number }) {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(`/admin/users${queryString ? `?${queryString}` : ''}`);
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    return this.request(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  }

  async updateUserBalance(userId: string, amount: number, reason: string) {
    return this.request(`/admin/users/${userId}/balance`, {
      method: 'POST',
      body: JSON.stringify({ amount, reason }),
    });
  }

  async getPendingDeposits(params?: { limit?: number; skip?: number }) {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(`/admin/deposits/pending${queryString ? `?${queryString}` : ''}`);
  }

  async approveDeposit(depositId: string, usdAmount: number) {
    return this.request(`/admin/deposits/${depositId}/approve`, {
      method: 'PATCH',
      body: JSON.stringify({ usdAmount }),
    });
  }

  async rejectDeposit(depositId: string, reason: string) {
    return this.request(`/admin/deposits/${depositId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  }

  async getAdminSettings() {
    return this.request('/admin/settings');
  }

  async updateAdminSettings(settings: {
    cryptoAddresses?: Record<string, string>;
    minimumDeposit?: number;
    cardIssuanceFee?: number;
  }) {
    return this.request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }
}

export const api = new ApiClient();
