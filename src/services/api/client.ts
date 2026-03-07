import { ApiException, parseApiError, ErrorCodes } from './errors';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const TIMEOUT = 30000;

interface RequestConfig extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { timeout = TIMEOUT, ...fetchConfig } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...fetchConfig,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchConfig.headers,
        },
      });

      clearTimeout(timeoutId);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        if (!response.ok) {
          throw new ApiException(response.status, 'Invalid response', 'SERVER_ERROR');
        }
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new ApiException(
          response.status,
          data.message || 'Request failed',
          data.code || ErrorCodes.SERVER_ERROR
        );
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiException) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiException(408, ErrorCodes.TIMEOUT, ErrorCodes.TIMEOUT);
        }
        throw parseApiError(error);
      }

      throw new ApiException(500, 'Unknown error', 'UNKNOWN_ERROR');
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

// API Endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
    verifyOtp: '/auth/verify-otp',
  },
  vault: {
    items: '/vault/items',
    item: (id: string) => `/vault/items/${id}`,
    accounts: '/vault/accounts',
    crypto: '/vault/crypto',
    documents: '/vault/documents',
    messages: '/vault/messages',
  },
  beneficiaries: {
    list: '/beneficiaries',
    invite: '/beneficiaries/invite',
    verify: (id: string) => `/beneficiaries/${id}/verify`,
    remove: (id: string) => `/beneficiaries/${id}`,
  },
  triggers: {
    config: '/triggers/config',
    claim: '/triggers/claim',
    verify: (id: string) => `/triggers/verify/${id}`,
  },
  user: {
    profile: '/user/profile',
    settings: '/user/settings',
  },
} as const;

