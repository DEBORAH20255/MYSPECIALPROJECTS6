import { GetUsersParams, GetUsersResponse, LoginResponse } from '@/types/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.search) searchParams.append('search', params.search);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    
    const queryString = searchParams.toString();
    const endpoint = `/api/users${queryString ? `?${queryString}` : ''}`;
    
    return this.request<GetUsersResponse>(endpoint);
  }

  async logout(): Promise<void> {
    return this.request<void>('/api/auth/logout', {
      method: 'POST',
    });
  }
}

// Create and export the singleton instance
export const apiClient = new ApiClient();

// Also export the class for potential future use
export { ApiClient };