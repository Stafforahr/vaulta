// User Types
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

// Vault Types
export interface DigitalAccount {
  id: string;
  platform: string;
  username: string;
  email: string;
  category: 'social' | 'email' | 'banking' | 'streaming' | 'work' | 'other';
  notes: string;
  encrypted: boolean;
  createdAt: string;
  icon: string;
}

export interface CryptoWallet {
  id: string;
  name: string;
  type: string;
  walletAddress: string;
  seedPhrase: string;
  estimatedValue: string;
  network: string;
  encrypted: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'will' | 'deed' | 'insurance' | 'bank' | 'identity' | 'other';
  description: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  encrypted: boolean;
}

export interface PersonalMessage {
  id: string;
  title: string;
  recipient: string;
  recipientId: string;
  content: string;
  type: 'video' | 'text' | 'audio';
  deliveryCondition: 'death' | 'inactivity' | 'specific_date';
  createdAt: string;
  encrypted: boolean;
}

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  role: 'heir' | 'trusted_contact' | 'executor';
  status: 'verified' | 'pending' | 'invited';
  assets: string[];
  addedAt: string;
}

export interface TriggerConfig {
  inactivityPeriod: number;
  checkInFrequency: number;
  verificationRule: '2of3' | '3of3' | '1of3';
  requireDeathCertificate: boolean;
  gracePeriod: number;
  notifyBeneficiaries: boolean;
  autoRelease: boolean;
  trustedContactAlerts: boolean;
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

