// Export Supabase client
export { supabase } from './supabase';

// Export types from types index
export type {
  Profile,
  DigitalAccount,
  CryptoWallet,
  Document,
  PersonalMessage,
  Beneficiary,
  TriggerConfig,
  CheckinLog,
  ActivityLog,
  User,
  AuthState,
  LoginCredentials,
  SignupData,
  ApiError,
  ApiResponse,
  Toast,
} from '../types';

// Export auth functions
export * from './auth';

// Export vault functions
export * from './vault';

// Export email functions
export * from './email';

// Export API client
export { api, endpoints } from './api';

