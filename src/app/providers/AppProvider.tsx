import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type {
  DigitalAccount,
  CryptoWallet,
  Document,
  PersonalMessage,
  Beneficiary,
  TriggerConfig,
} from '../../types';

// Mock Data
const mockAccounts: DigitalAccount[] = [
  {
    id: 'acc_001',
    platform: 'Gmail',
    username: 'adebayo.okafor',
    email: 'adebayo.okafor@gmail.com',
    category: 'email',
    notes: 'Primary email account. Contains important financial records.',
    encrypted: true,
    createdAt: '2024-01-15',
    icon: '📧',
  },
  {
    id: 'acc_002',
    platform: 'Facebook',
    username: 'adebayo.okafor.lagos',
    email: 'adebayo.okafor@gmail.com',
    category: 'social',
    notes: 'Family and friends account. Memorialization requested.',
    encrypted: true,
    createdAt: '2024-01-20',
    icon: '👤',
  },
  {
    id: 'acc_003',
    platform: 'GTBank Online Banking',
    username: 'adebaYO2024',
    email: 'adebayo.okafor@gmail.com',
    category: 'banking',
    notes: 'Main savings and current account. Account number: 0123456789',
    encrypted: true,
    createdAt: '2024-02-01',
    icon: '🏦',
  },
  {
    id: 'acc_004',
    platform: 'LinkedIn',
    username: 'adebayo-okafor-lagos',
    email: 'adebayo.okafor@gmail.com',
    category: 'work',
    notes: 'Professional network and career history.',
    encrypted: true,
    createdAt: '2024-02-10',
    icon: '💼',
  },
];

const mockCryptoWallets: CryptoWallet[] = [
  {
    id: 'crypto_001',
    name: 'Main Bitcoin Wallet',
    type: 'Bitcoin',
    walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    seedPhrase: 'abandon ability able about above absent absorb abstract absurd abuse access accident',
    estimatedValue: '₦ 4,200,000',
    network: 'Bitcoin Mainnet',
    encrypted: true,
    createdAt: '2024-01-10',
  },
  {
    id: 'crypto_002',
    name: 'Ethereum DeFi Wallet',
    type: 'Ethereum',
    walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    seedPhrase: 'wagon yellow artist diesel finger gown history kite lemon moral nephew observe',
    estimatedValue: '₦ 1,850,000',
    network: 'Ethereum Mainnet',
    encrypted: true,
    createdAt: '2024-02-05',
  },
];

const mockDocuments: Document[] = [
  {
    id: 'doc_001',
    name: 'Last Will and Testament',
    type: 'will',
    description: 'Legal will dated March 2024, drafted by Okonkwo & Partners Law Firm.',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    uploadedAt: '2024-03-01',
    encrypted: true,
  },
  {
    id: 'doc_002',
    name: 'Property Deed - Lekki Phase 1',
    type: 'deed',
    description: 'Certificate of occupancy for 4-bedroom property at 12 Admiralty Way.',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    uploadedAt: '2024-03-05',
    encrypted: true,
  },
  {
    id: 'doc_003',
    name: 'Life Insurance Policy - AXA Mansard',
    type: 'insurance',
    description: 'Policy #AXA-2024-00812. Sum assured: ₦50,000,000. Beneficiary: Ngozi Okafor.',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    uploadedAt: '2024-03-10',
    encrypted: true,
  },
];

const mockMessages: PersonalMessage[] = [
  {
    id: 'msg_001',
    title: 'To My Beloved Family',
    recipient: 'Ngozi Okafor',
    recipientId: 'ben_001',
    content:
      'My darling Ngozi and children, by the time you read this, I hope you know how deeply I loved each one of you. The house in Lekki is yours — please take care of it. The access to my accounts and investments are all documented in this vault. Stay strong, support each other, and build on what we started together. With all my love, Adebayo.',
    type: 'text',
    deliveryCondition: 'death',
    createdAt: '2024-03-15',
    encrypted: true,
  },
];

const mockBeneficiaries: Beneficiary[] = [
  {
    id: 'ben_001',
    name: 'Ngozi Okafor',
    relationship: 'Spouse',
    email: 'ngozi.okafor@gmail.com',
    phone: '+234 802 345 6789',
    role: 'heir',
    status: 'verified',
    assets: ['acc_001', 'acc_003', 'doc_001', 'doc_002', 'crypto_001'],
    addedAt: '2024-01-15',
  },
  {
    id: 'ben_002',
    name: 'Chukwuemeka Okafor',
    relationship: 'Brother',
    email: 'emeka.okafor@yahoo.com',
    phone: '+234 803 456 7890',
    role: 'trusted_contact',
    status: 'verified',
    assets: ['doc_003'],
    addedAt: '2024-01-20',
  },
  {
    id: 'ben_003',
    name: 'Barrister Akinwale Adeyemi',
    relationship: 'Legal Executor',
    email: 'a.adeyemi@okonkwopartners.com',
    phone: '+234 804 567 8901',
    role: 'executor',
    status: 'pending',
    assets: ['doc_001', 'doc_002'],
    addedAt: '2024-02-01',
  },
];

const defaultTriggerConfig: TriggerConfig = {
  inactivityPeriod: 90,
  checkInFrequency: 30,
  verificationRule: '2of3',
  requireDeathCertificate: true,
  gracePeriod: 14,
  notifyBeneficiaries: true,
  autoRelease: false,
  trustedContactAlerts: true,
};

interface AppContextType {
  accounts: DigitalAccount[];
  cryptoWallets: CryptoWallet[];
  documents: Document[];
  messages: PersonalMessage[];
  beneficiaries: Beneficiary[];
  triggerConfig: TriggerConfig;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setTriggerConfig: (config: TriggerConfig) => void;
  addAccount: (account: DigitalAccount) => void;
  addCryptoWallet: (wallet: CryptoWallet) => void;
  addDocument: (doc: Document) => void;
  addMessage: (msg: PersonalMessage) => void;
  addBeneficiary: (ben: Beneficiary) => void;
  deleteAccount: (id: string) => void;
  deleteCryptoWallet: (id: string) => void;
  deleteDocument: (id: string) => void;
  deleteMessage: (id: string) => void;
  deleteBeneficiary: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<DigitalAccount[]>(mockAccounts);
  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>(mockCryptoWallets);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [messages, setMessages] = useState<PersonalMessage[]>(mockMessages);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries);
  const [triggerConfig, setTriggerConfig] = useState<TriggerConfig>(defaultTriggerConfig);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value: AppContextType = {
    accounts,
    cryptoWallets,
    documents,
    messages,
    beneficiaries,
    triggerConfig,
    sidebarOpen,
    setSidebarOpen,
    setTriggerConfig,
    addAccount: useCallback((a) => setAccounts((prev) => [a, ...prev]), []),
    addCryptoWallet: useCallback((w) => setCryptoWallets((prev) => [w, ...prev]), []),
    addDocument: useCallback((d) => setDocuments((prev) => [d, ...prev]), []),
    addMessage: useCallback((m) => setMessages((prev) => [m, ...prev]), []),
    addBeneficiary: useCallback((b) => setBeneficiaries((prev) => [b, ...prev]), []),
    deleteAccount: useCallback((id) => setAccounts((prev) => prev.filter((a) => a.id !== id)), []),
    deleteCryptoWallet: useCallback((id) => setCryptoWallets((prev) => prev.filter((w) => w.id !== id)), []),
    deleteDocument: useCallback((id) => setDocuments((prev) => prev.filter((d) => d.id !== id)), []),
    deleteMessage: useCallback((id) => setMessages((prev) => prev.filter((m) => m.id !== id)), []),
    deleteBeneficiary: useCallback((id) => setBeneficiaries((prev) => prev.filter((b) => b.id !== id)), []),
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

