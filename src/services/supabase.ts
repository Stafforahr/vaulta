import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import type { Profile } from '../types';

// Environment variables - you need to set these in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️  Supabase configuration missing! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file'
  );
}

// Create Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Time before the token expires to refresh it (in seconds)
    // Default is 10 seconds before expiry
  },
});

// Re-export Profile from types
export { Profile };

// Helper functions
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return user;
};

export const getSession = async (): Promise<Session | null> => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return session;
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Auth listeners
export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

export default supabase;
