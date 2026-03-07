// API Services
export { api, endpoints } from './api/client';
export { 
  ApiException, 
  ErrorCodes, 
  UserFriendlyMessages, 
  getErrorMessage, 
  parseApiError 
} from './api/errors';

// Auth Service
export * from './auth';

// Supabase Client
export { supabase, getCurrentUser, getSession, signOut, onAuthStateChange } from './supabase';
export type { Profile } from './supabase';

