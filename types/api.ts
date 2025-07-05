// API Response Types
export interface User {
  id: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface LoginResponse {
  message: string;
  email: string;
  sessionToken: string;
}

export interface ApiError {
  error: string;
}

// API Client Types
export interface GetUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}