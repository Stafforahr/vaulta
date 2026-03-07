import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: "free" | "premium" | "enterprise";
  avatarInitials: string;
  location: string;
  joinedDate: string;
  lastCheckin: string;
  vaultHealth: number;
}

export interface DigitalAccount {
  id: string;
  platform: string;
  username: string;
  email: string;
  category: "social" | "email" | "banking" | "streaming" | "work" | "other";
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
  type: "will" | "deed" | "insurance" | "bank" | "identity" | "other";
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
  type: "video" | "text" | "audio";
  deliveryCondition: "death" | "inactivity" | "specific_date";
  createdAt: string;
  encrypted: boolean;
}

export interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  role: "heir" | "trusted_contact" | "executor";
  status: "verified" | "pending" | "invited";
  assets: string[];
  addedAt: string;
}

export interface TriggerConfig {
  inactivityPeriod: number; // days
  checkInFrequency: number; // days
  verificationRule: "2of3" | "3of3" | "1of3";
  requireDeathCertificate: boolean;
  gracePeriod: number; // days
  notifyBeneficiaries: boolean;
  autoRelease: boolean;
  trustedContactAlerts: boolean;
}

interface AppContextType {
  user: User;
  isAuthenticated: boolean;
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

const mockUser: User = {
  id: "usr_001",
  name: "Adebayo Okafor",
  email: "adebayo.okafor@gmail.com",
  phone: "+234 801 234 5678",
  plan: "premium",
  avatarInitials: "AO",
  location: "Lagos, Nigeria",
  joinedDate: "January 2024",
  lastCheckin: "3 days ago",
  vaultHealth: 78,
};

const mockAccounts: DigitalAccount[] = [
  {
    id: "acc_001",
    platform: "Gmail",
    username: "adebayo.okafor",
    email: "adebayo.okafor@gmail.com",
    category: "email",
    notes: "Primary email account. Contains important financial records.",
    encrypted: true,
    createdAt: "2024-01-15",
    icon: "📧",
  },
  {
    id: "acc_002",
    platform: "Facebook",
    username: "adebayo.okafor.lagos",
    email: "adebayo.okafor@gmail.com",
    category: "social",
    notes: "Family and friends account. Memorialization requested.",
    encrypted: true,
    createdAt: "2024-01-20",
    icon: "👤",
  },
  {
    id: "acc_003",
    platform: "GTBank Online Banking",
    username: "adebaYO2024",
    email: "adebayo.okafor@gmail.com",
    category: "banking",
    notes: "Main savings and current account. Account number: 0123456789",
    encrypted: true,
    createdAt: "2024-02-01",
    icon: "🏦",
  },
  {
    id: "acc_004",
    platform: "LinkedIn",
    username: "adebayo-okafor-lagos",
    email: "adebayo.okafor@gmail.com",
    category: "work",
    notes: "Professional network and career history.",
    encrypted: true,
    createdAt: "2024-02-10",
    icon: "💼",
  },
];

const mockCryptoWallets: CryptoWallet[] = [
  {
    id: "crypto_001",
    name: "Main Bitcoin Wallet",
    type: "Bitcoin",
    walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    seedPhrase: "abandon ability able about above absent absorb abstract absurd abuse access accident",
    estimatedValue: "₦ 4,200,000",
    network: "Bitcoin Mainnet",
    encrypted: true,
    createdAt: "2024-01-10",
  },
  {
    id: "crypto_002",
    name: "Ethereum DeFi Wallet",
    type: "Ethereum",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    seedPhrase: "wagon yellow artist diesel finger gown history kite lemon moral nephew observe",
    estimatedValue: "₦ 1,850,000",
    network: "Ethereum Mainnet",
    encrypted: true,
    createdAt: "2024-02-05",
  },
];

const mockDocuments: Document[] = [
  {
    id: "doc_001",
    name: "Last Will and Testament",
    type: "will",
    description: "Legal will dated March 2024, drafted by Okonkwo & Partners Law Firm.",
    fileSize: "2.4 MB",
    fileType: "PDF",
    uploadedAt: "2024-03-01",
    encrypted: true,
  },
  {
    id: "doc_002",
    name: "Property Deed - Lekki Phase 1",
    type: "deed",
    description: "Certificate of occupancy for 4-bedroom property at 12 Admiralty Way.",
    fileSize: "1.8 MB",
    fileType: "PDF",
    uploadedAt: "2024-03-05",
    encrypted: true,
  },
  {
    id: "doc_003",
    name: "Life Insurance Policy - AXA Mansard",
    type: "insurance",
    description: "Policy #AXA-2024-00812. Sum assured: ₦50,000,000. Beneficiary: Ngozi Okafor.",
    fileSize: "3.1 MB",
    fileType: "PDF",
    uploadedAt: "2024-03-10",
    encrypted: true,
  },
];

const mockMessages: PersonalMessage[] = [
  {
    id: "msg_001",
    title: "To My Beloved Family",
    recipient: "Ngozi Okafor",
    recipientId: "ben_001",
    content:
      "My darling Ngozi and children, by the time you read this, I hope you know how deeply I loved each one of you. The house in Lekki is yours — please take care of it. The access to my accounts and investments are all documented in this vault. Stay strong, support each other, and build on what we started together. With all my love, Adebayo.",
    type: "text",
    deliveryCondition: "death",
    createdAt: "2024-03-15",
    encrypted: true,
  },
];

const mockBeneficiaries: Beneficiary[] = [
  {
    id: "ben_001",
    name: "Ngozi Okafor",
    relationship: "Spouse",
    email: "ngozi.okafor@gmail.com",
    phone: "+234 802 345 6789",
    role: "heir",
    status: "verified",
    assets: ["acc_001", "acc_003", "doc_001", "doc_002", "crypto_001"],
    addedAt: "2024-01-15",
  },
  {
    id: "ben_002",
    name: "Chukwuemeka Okafor",
    relationship: "Brother",
    email: "emeka.okafor@yahoo.com",
    phone: "+234 803 456 7890",
    role: "trusted_contact",
    status: "verified",
    assets: ["doc_003"],
    addedAt: "2024-01-20",
  },
  {
    id: "ben_003",
    name: "Barrister Akinwale Adeyemi",
    relationship: "Legal Executor",
    email: "a.adeyemi@okonkwopartners.com",
    phone: "+234 804 567 8901",
    role: "executor",
    status: "pending",
    assets: ["doc_001", "doc_002"],
    addedAt: "2024-02-01",
  },
];

const defaultTriggerConfig: TriggerConfig = {
  inactivityPeriod: 90,
  checkInFrequency: 30,
  verificationRule: "2of3",
  requireDeathCertificate: true,
  gracePeriod: 14,
  notifyBeneficiaries: true,
  autoRelease: false,
  trustedContactAlerts: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<DigitalAccount[]>(mockAccounts);
  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>(mockCryptoWallets);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [messages, setMessages] = useState<PersonalMessage[]>(mockMessages);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries);
  const [triggerConfig, setTriggerConfig] = useState<TriggerConfig>(defaultTriggerConfig);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user: mockUser,
        isAuthenticated: true,
        accounts,
        cryptoWallets,
        documents,
        messages,
        beneficiaries,
        triggerConfig,
        sidebarOpen,
        setSidebarOpen,
        setTriggerConfig,
        addAccount: (a) => setAccounts((prev) => [a, ...prev]),
        addCryptoWallet: (w) => setCryptoWallets((prev) => [w, ...prev]),
        addDocument: (d) => setDocuments((prev) => [d, ...prev]),
        addMessage: (m) => setMessages((prev) => [m, ...prev]),
        addBeneficiary: (b) => setBeneficiaries((prev) => [b, ...prev]),
        deleteAccount: (id) => setAccounts((prev) => prev.filter((a) => a.id !== id)),
        deleteCryptoWallet: (id) => setCryptoWallets((prev) => prev.filter((w) => w.id !== id)),
        deleteDocument: (id) => setDocuments((prev) => prev.filter((d) => d.id !== id)),
        deleteMessage: (id) => setMessages((prev) => prev.filter((m) => m.id !== id)),
        deleteBeneficiary: (id) => setBeneficiaries((prev) => prev.filter((b) => b.id !== id)),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
