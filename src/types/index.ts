// User Types (app-facing - camelCase for frontend use)
export interface User {
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
}

// Database Profile type (snake_case to match Supabase/PostgreSQL schema)
export interface Profile {
  id: string;
  name: string;
  phone: string | null;
  plan: 'free' | 'premium' | 'enterprise';
  avatar_initials: string | null;
  location: string | null;
  vault_health: number;
  created_at: string;
  updated_at: string;
}

// Database types (snake_case to match Supabase/PostgreSQL schema)
// These are used when interacting directly with the database
export interface DbDigitalAccount {
  id: string;
  user_id: string;
  platform: string;
  username: string | null;
  email: string | null;
  category: 'social' | 'email' | 'banking' | 'streaming' | 'work' | 'other';
  notes: string | null;
  encrypted: boolean;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

// Alias for backwards compatibility
export type DigitalAccount = DbDigitalAccount;

export interface DbCryptoWallet {
  id: string;
  user_id: string;
  name: string;
  type: string;
  wallet_address: string;
  seed_phrase_encrypted: string | null;
  estimated_value: string | null;
  network: string | null;
  encrypted: boolean;
  created_at: string;
  updated_at: string;
}

// Alias for backwards compatibility
export type CryptoWallet = DbCryptoWallet;

export interface DbDocument {
  id: string;
  user_id: string;
  name: string;
  type: 'will' | 'deed' | 'insurance' | 'bank' | 'identity' | 'other';
  description: string | null;
  file_size: string | null;
  file_type: string | null;
  file_url: string | null;
  encrypted: boolean;
  uploaded_at: string;
  created_at: string;
  updated_at: string;
}

// Alias for backwards compatibility
export type Document = DbDocument;

export interface DbPersonalMessage {
  id: string;
  user_id: string;
  title: string;
  recipient: string;
  recipient_id: string | null;
  content: string;
  type: 'video' | 'text' | 'audio';
  delivery_condition: 'death' | 'inactivity' | 'specific_date';
  delivery_date: string | null;
  encrypted: boolean;
  created_at: string;
  updated_at: string;
}

// Alias for backwards compatibility
export type PersonalMessage = DbPersonalMessage;

export interface DbBeneficiary {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string | null;
  role: 'heir' | 'trusted_contact' | 'executor';
  status: 'verified' | 'pending' | 'invited';
  assets: string[];
  added_at: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// Alias for backwards compatibility
export type Beneficiary = DbBeneficiary;

export interface DbTriggerConfig {
  id: string;
  user_id: string;
  inactivity_period: number;
  check_in_frequency: number;
  verification_rule: string;
  require_death_certificate: boolean;
  grace_period: number;
  notify_beneficiaries: boolean;
  auto_release: boolean;
  trusted_contact_alerts: boolean;
  created_at: string;
  updated_at: string;
}

// Alias for backwards compatibility
export type TriggerConfig = DbTriggerConfig;

export interface CheckinLog {
  id: string;
  user_id: string;
  checked_in_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// API Types
export interface ApiError {
  message: string;
  code: string;
  status: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Toast Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

