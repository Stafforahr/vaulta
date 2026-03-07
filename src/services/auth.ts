/**
 * Authentication Service
 * Handles JWT token management, storage, and refresh logic
 */

import { api, endpoints } from './api/client';

// Token storage keys
const ACCESS_TOKEN_KEY = 'vaulta_access_token';
const REFRESH_TOKEN_KEY = 'vaulta_refresh_token';
const TOKEN_EXPIRY_KEY = 'vaulta_token_expiry';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    plan: 'free' | 'premium' | 'enterprise';
    avatarInitials: string;
    location: string;
    joinedDate: string;
    lastCheckin: string;
    vaultHealth: number;
  };
  tokens: AuthTokens;
}

/**
 * Store tokens in localStorage
 */
export function storeTokens(tokens: AuthTokens): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  
  // Store expiry time (current time + expiresIn seconds)
  const expiryTime = Date.now() + (tokens.expiresIn * 1000);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
}

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get stored refresh token
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Check if token is expired
 */
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') return true;
  
  const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryStr) return true;
  
  const expiryTime = parseInt(expiryStr, 10);
  // Consider expired 60 seconds before actual expiry
  return Date.now() >= (expiryTime - 60000);
}

/**
 * Clear all auth tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * Refresh the access token
 */
export async function refreshAccessToken(): Promise<AuthTokens | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await api.post<{ tokens: AuthTokens }>(
      endpoints.auth.refreshToken,
      { refreshToken }
    );
    
    if (response.tokens) {
      storeTokens(response.tokens);
      return response.tokens;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
}

/**
 * Login with email and password
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(endpoints.auth.login, credentials);
  
  if (response.tokens) {
    storeTokens(response.tokens);
  }
  
  return response;
}

/**
 * Register new user
 */
export async function signup(data: SignupRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(endpoints.auth.signup, data);
  
  if (response.tokens) {
    storeTokens(response.tokens);
  }
  
  return response;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  try {
    await api.post(endpoints.auth.logout);
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    clearTokens();
  }
}

/**
 * Verify OTP for enhanced security
 */
export async function verifyOtp(otp: string): Promise<{ verified: boolean }> {
  return api.post<{ verified: boolean }>(endpoints.auth.verifyOtp, { otp });
}

/**
 * Get authorization header with current token
 */
export function getAuthHeader(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
  storeTokens,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  clearTokens,
  refreshAccessToken,
  login,
  signup,
  logout,
  verifyOtp,
  getAuthHeader,
};

