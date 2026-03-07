import type { ApiError } from '../../types';

export class ApiException extends Error implements ApiError {
  status: number;
  code: string;

  constructor(status: number, message: string, code: string = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
  }
}

export const ErrorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT',
} as const;

export const UserFriendlyMessages: Record<string, string> = {
  [ErrorCodes.NETWORK_ERROR]: 'Please check your internet connection and try again.',
  [ErrorCodes.UNAUTHORIZED]: 'Your session has expired. Please log in again.',
  [ErrorCodes.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ErrorCodes.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorCodes.VALIDATION_ERROR]: 'Please check the highlighted fields and try again.',
  [ErrorCodes.SERVER_ERROR]: 'Something went wrong on our end. Please try again later.',
  [ErrorCodes.TIMEOUT]: 'The request took too long. Please try again.',
} as const;

export function getErrorMessage(code: string): string {
  return UserFriendlyMessages[code] || 'An unexpected error occurred. Please try again.';
}

export function parseApiError(error: unknown): ApiException {
  if (error instanceof ApiException) {
    return error;
  }

  if (error instanceof Error) {
    // Network error
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return new ApiException(0, ErrorCodes.NETWORK_ERROR, ErrorCodes.NETWORK_ERROR);
    }
    
    // Timeout
    if (error.message.includes('timeout')) {
      return new ApiException(408, ErrorCodes.TIMEOUT, ErrorCodes.TIMEOUT);
    }
  }

  return new ApiException(500, 'An unexpected error occurred', 'UNKNOWN_ERROR');
}

