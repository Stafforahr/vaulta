import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { supabase } from '../../services/supabase';
import type {
  DigitalAccount,
  CryptoWallet,
  Document,
  PersonalMessage,
  Beneficiary,
  TriggerConfig,
} from '../../types';

interface AppUser {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  plan: string;
  vaultHealth: number;
  lastCheckin: string;
  phone: string;
  location: string;
}

interface AppContextType {
  user: AppUser | null;
  accounts: DigitalAccount[];
  cryptoWallets: CryptoWallet[];
  documents: Document[];
  messages: PersonalMessage[];
  beneficiaries: Beneficiary[];
  triggerConfig: TriggerConfig;
  sidebarOpen: boolean;
  isLoading: boolean;
  setSidebarOpen: (open: boolean) => void;
  setTriggerConfig: (config: TriggerConfig) => void;
  addAccount: (account: DigitalAccount) => Promise<void>;
  addCryptoWallet: (wallet: CryptoWallet) => Promise<void>;
  addDocument: (doc: Document) => Promise<void>;
  addMessage: (msg: PersonalMessage) => Promise<void>;
  addBeneficiary: (ben: Beneficiary) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  deleteCryptoWallet: (id: string) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  deleteBeneficiary: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default trigger config
const defaultTriggerConfig: TriggerConfig = {
  id: '',
  user_id: '',
  inactivity_period: 90,
  check_in_frequency: 30,
  verification_rule: '2of3',
  require_death_certificate: true,
  grace_period: 14,
  notify_beneficiaries: true,
  auto_release: false,
  trusted_contact_alerts: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [accounts, setAccounts] = useState<DigitalAccount[]>([]);
  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<PersonalMessage[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [triggerConfig, setTriggerConfig] = useState<TriggerConfig>(defaultTriggerConfig);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from Supabase
  const fetchProfile = useCallback(async (authUser: any): Promise<AppUser | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error || !data) {
      // Return default user if no profile exists
      const name = authUser.email?.split('@')[0] || 'User';
      return {
        id: authUser.id,
        name: name,
        email: authUser.email || '',
        avatarInitials: name.slice(0, 2).toUpperCase(),
        plan: 'free',
        vaultHealth: 0,
        lastCheckin: 'Never',
        phone: '',
        location: '',
      };
    }

    const name = data.name || authUser.email?.split('@')[0] || 'User';
    const initials = name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

    return {
      id: data.id,
      name: data.name || name,
      email: authUser.email || '',
      avatarInitials: data.avatar_initials || initials,
      plan: data.plan || 'free',
      vaultHealth: data.vault_health || 0,
      lastCheckin: 'Just now',
      phone: data.phone || '',
      location: data.location || '',
    };
  }, []);

  // Fetch all user data from Supabase
  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        setIsLoading(false);
        return;
      }

      // Fetch user profile
      const profile = await fetchProfile(authUser);
      setUser(profile);

      // Fetch all data in parallel
      const [
        accountsRes,
        cryptoRes,
        documentsRes,
        messagesRes,
        beneficiariesRes,
        triggerRes
      ] = await Promise.all([
        supabase.from('digital_accounts').select('*').eq('user_id', authUser.id),
        supabase.from('crypto_wallets').select('*').eq('user_id', authUser.id),
        supabase.from('documents').select('*').eq('user_id', authUser.id),
        supabase.from('personal_messages').select('*').eq('user_id', authUser.id),
        supabase.from('beneficiaries').select('*').eq('user_id', authUser.id),
        supabase.from('trigger_configs').select('*').eq('user_id', authUser.id).single()
      ]);

      if (accountsRes.data) setAccounts(accountsRes.data);
      if (cryptoRes.data) setCryptoWallets(cryptoRes.data);
      if (documentsRes.data) setDocuments(documentsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
      if (beneficiariesRes.data) setBeneficiaries(beneficiariesRes.data);
      if (triggerRes.data) {
        setTriggerConfig(triggerRes.data);
} else {
        // Create default trigger config if none exists
        const { data: newConfig } = await supabase
          .from('trigger_configs')
          .upsert({ ...defaultTriggerConfig, user_id: authUser.id })
          .select()
          .single();
        if (newConfig) setTriggerConfig(newConfig);
      }

      // Calculate vault health based on filled data
      if (profile) {
        const totalAssets = (accountsRes.data?.length || 0) + 
          (cryptoRes.data?.length || 0) + 
          (documentsRes.data?.length || 0) + 
          (messagesRes.data?.length || 0);
        const hasBeneficiaries = (beneficiariesRes.data?.length || 0) > 0;
        
        let health = 0;
        if (totalAssets > 0) health += 25;
        if ((documentsRes.data?.length || 0) > 0) health += 25;
        if (hasBeneficiaries) health += 25;
        if (beneficiariesRes.data?.some((b: Beneficiary) => b.status === 'verified')) health += 25;
        
        setUser(prev => prev ? { ...prev, vaultHealth: health } : null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  // Initial data fetch
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchUserData();
      } else {
        // Clear data on logout
        setUser(null);
        setAccounts([]);
        setCryptoWallets([]);
        setDocuments([]);
        setMessages([]);
        setBeneficiaries([]);
        setTriggerConfig(defaultTriggerConfig);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserData]);

  const addAccount = useCallback(async (account: DigitalAccount) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const { data, error } = await supabase
      .from('digital_accounts')
      .insert({ ...account, user_id: authUser.id })
      .select()
      .single();

    if (data && !error) {
      setAccounts(prev => [data, ...prev]);
    }
  }, []);

  const addCryptoWallet = useCallback(async (wallet: CryptoWallet) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const { data, error } = await supabase
      .from('crypto_wallets')
      .insert({ ...wallet, user_id: authUser.id })
      .select()
      .single();

    if (data && !error) {
      setCryptoWallets(prev => [data, ...prev]);
    }
  }, []);

  const addDocument = useCallback(async (doc: Document) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const { data, error } = await supabase
      .from('documents')
      .insert({ ...doc, user_id: authUser.id })
      .select()
      .single();

    if (data && !error) {
      setDocuments(prev => [data, ...prev]);
    }
  }, []);

  const addMessage = useCallback(async (msg: PersonalMessage) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const { data, error } = await supabase
      .from('personal_messages')
      .insert({ ...msg, user_id: authUser.id })
      .select()
      .single();

    if (data && !error) {
      setMessages(prev => [data, ...prev]);
    }
  }, []);

  const addBeneficiary = useCallback(async (ben: Beneficiary) => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const { data, error } = await supabase
      .from('beneficiaries')
      .insert({ ...ben, user_id: authUser.id })
      .select()
      .single();

    if (data && !error) {
      setBeneficiaries(prev => [data, ...prev]);
    }
  }, []);

  const deleteAccount = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('digital_accounts')
      .delete()
      .eq('id', id);

    if (!error) {
      setAccounts(prev => prev.filter(a => a.id !== id));
    }
  }, []);

  const deleteCryptoWallet = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('crypto_wallets')
      .delete()
      .eq('id', id);

    if (!error) {
      setCryptoWallets(prev => prev.filter(w => w.id !== id));
    }
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (!error) {
      setDocuments(prev => prev.filter(d => d.id !== id));
    }
  }, []);

  const deleteMessage = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('personal_messages')
      .delete()
      .eq('id', id);

    if (!error) {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  }, []);

  const deleteBeneficiary = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('beneficiaries')
      .delete()
      .eq('id', id);

    if (!error) {
      setBeneficiaries(prev => prev.filter(b => b.id !== id));
    }
  }, []);

  const refreshData = useCallback(async () => {
    await fetchUserData();
  }, [fetchUserData]);

  const value: AppContextType = {
    user,
    accounts,
    cryptoWallets,
    documents,
    messages,
    beneficiaries,
    triggerConfig,
    sidebarOpen,
    isLoading,
    setSidebarOpen,
    setTriggerConfig,
    addAccount,
    addCryptoWallet,
    addDocument,
    addMessage,
    addBeneficiary,
    deleteAccount,
    deleteCryptoWallet,
    deleteDocument,
    deleteMessage,
    deleteBeneficiary,
    refreshData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
