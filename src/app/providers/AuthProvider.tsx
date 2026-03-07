import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, getCurrentUser, Profile } from '../../services/supabase';
import type { User as AppUser, AuthState, LoginCredentials, SignupData } from '../../types';

// Helper to convert Supabase user to app user
const mapUserToAppUser = (user: User, profile?: Profile | null): AppUser => {
  const name = profile?.name || user.email?.split('@')[0] || 'User';
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return {
    id: user.id,
    name,
    email: user.email || '',
    phone: profile?.phone || '',
    plan: profile?.plan || 'free',
    avatarInitials: initials,
    location: profile?.location || '',
    joinedDate: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    lastCheckin: 'Just now',
    vaultHealth: 0,
  };
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile from profiles table
  const fetchProfile = useCallback(async (authUser: User): Promise<Profile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', authUser.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentSession = await supabase.auth.getSession();
        if (currentSession.data.session) {
          setSession(currentSession.data.session);
          const currentUser = currentSession.data.session.user;
          const profile = await fetchProfile(currentUser);
          setUser(mapUserToAppUser(currentUser, profile));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          const profile = await fetchProfile(newSession.user);
          setUser(mapUserToAppUser(newSession.user, profile));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      if (data.user) {
        const profile = await fetchProfile(data.user);
        setUser(mapUserToAppUser(data.user, profile));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
          },
        },
      });

      if (error) throw error;

      if (authData.user) {
        // Create profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            name: data.name,
            phone: data.phone,
            plan: 'free',
            avatar_initials: data.name
              .split(' ')
              .map(n => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase(),
            location: '',
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

        setUser(mapUserToAppUser(authData.user, {
          id: crypto.randomUUID(),
          user_id: authData.user.id,
          name: data.name,
          phone: data.phone,
          plan: 'free',
          avatar_initials: data.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
          location: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.user) return;
    const profile = await fetchProfile(session.user);
    if (profile) {
      setUser(mapUserToAppUser(session.user, profile));
    }
  }, [session, fetchProfile]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
