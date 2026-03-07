import { useState, type ReactNode } from "react";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  CreditCard,
  Lock,
  Fingerprint,
  Eye,
  EyeOff,
  CheckCircle,
  ChevronRight,
  Crown,
  Trash2,
  Download,
} from "lucide-react";
import { useApp } from "../providers/AppProvider";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const;

type Tab = typeof tabs[number]["id"];

function ProfileTab() {
  const { user } = useAuth();
  
  // Fallback if user is null (shouldn't happen in authenticated route)
  if (!user) {
    return <div className="p-4 text-white/50">Loading...</div>;
  }
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 p-5 bg-white/3 border border-white/6 rounded-xl">
        <div className="w-16 h-16 rounded-full bg-[#D4A853]/15 border-2 border-[#D4A853]/30 flex items-center justify-center text-xl text-[#D4A853]" style={{ fontWeight: 700 }}>
          {user.avatarInitials}
        </div>
        <div>
          <p className="text-white" style={{ fontWeight: 600 }}>{user.name}</p>
          <p className="text-sm text-white/50">{user.email}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Crown size={12} className="text-[#D4A853]" />
            <span className="text-xs text-[#D4A853]" style={{ fontWeight: 500 }}>
              Premium Plan
            </span>
          </div>
        </div>
        <button className="ml-auto px-3 py-1.5 rounded-lg border border-white/10 text-sm text-white/50 hover:bg-white/5 transition-colors">
          Change Photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Full Name", key: "name", type: "text" },
          { label: "Email Address", key: "email", type: "email" },
          { label: "Phone Number", key: "phone", type: "tel" },
          { label: "Location", key: "location", type: "text" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-xs text-white/50 mb-1.5">{field.label}</label>
            <input
              type={field.type}
              value={form[field.key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all ${
            saved
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
              : "bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A]"
          }`}
          style={{ fontWeight: 600 }}
        >
          {saved ? <><CheckCircle size={15} /> Saved</> : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-5">
      {/* Password Change */}
      <div className="bg-white/2 border border-white/6 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={16} className="text-white/50" />
          <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>Change Password</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all pr-9"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
              >
                {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Min 8 characters"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all pr-9"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
              >
                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Auth Methods */}
      <div className="bg-white/2 border border-white/6 rounded-xl p-5">
        <h3 className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>Authentication Methods</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2.5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <Fingerprint size={18} className="text-[#D4A853]" />
              <div>
                <p className="text-sm text-white" style={{ fontWeight: 500 }}>Biometric Authentication</p>
                <p className="text-xs text-white/40">Face ID / Fingerprint unlock</p>
              </div>
            </div>
            <button
              onClick={() => setBiometric((p) => !p)}
              className={`relative w-11 h-6 rounded-full transition-all ${biometric ? "bg-[#D4A853]" : "bg-white/15"}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${biometric ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-emerald-400" />
              <div>
                <p className="text-sm text-white" style={{ fontWeight: 500 }}>Two-Factor Authentication</p>
                <p className="text-xs text-white/40">SMS verification on login</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactor((p) => !p)}
              className={`relative w-11 h-6 rounded-full transition-all ${twoFactor ? "bg-[#D4A853]" : "bg-white/15"}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${twoFactor ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5">
        <h3 className="text-red-400 text-sm mb-3" style={{ fontWeight: 600 }}>Danger Zone</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between py-2.5 text-sm text-white/60 hover:text-white transition-colors">
            <div className="flex items-center gap-2">
              <Download size={15} />
              Export All Vault Data
            </div>
            <ChevronRight size={14} />
          </button>
          <button className="w-full flex items-center justify-between py-2.5 text-sm text-red-400 hover:text-red-300 transition-colors border-t border-white/5 pt-3">
            <div className="flex items-center gap-2">
              <Trash2 size={15} />
              Delete Account & All Data
            </div>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    checkInReminders: true,
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: true,
    beneficiaryAlerts: true,
    securityAlerts: true,
    productUpdates: false,
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const notifications = [
    {
      group: "Check-in & Triggers",
      items: [
        { key: "checkInReminders" as const, label: "Check-in Reminders", desc: "Remind me to check in before the deadline" },
        { key: "beneficiaryAlerts" as const, label: "Beneficiary Activity", desc: "Notify when a beneficiary verifies their identity" },
      ],
    },
    {
      group: "Channels",
      items: [
        { key: "emailNotifications" as const, label: "Email Notifications", desc: "Receive notifications via email" },
        { key: "smsNotifications" as const, label: "SMS Notifications", desc: "Receive notifications via SMS" },
        { key: "whatsappNotifications" as const, label: "WhatsApp Notifications", desc: "Receive notifications via WhatsApp" },
      ],
    },
    {
      group: "Security & Updates",
      items: [
        { key: "securityAlerts" as const, label: "Security Alerts", desc: "Login attempts, vault access from new devices" },
        { key: "productUpdates" as const, label: "Product Updates", desc: "New features and Vaulta announcements" },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      {notifications.map((group) => (
        <div key={group.group} className="bg-white/2 border border-white/6 rounded-xl p-5">
          <h3 className="text-white/50 text-xs uppercase tracking-widest mb-4" style={{ fontWeight: 600 }}>
            {group.group}
          </h3>
          <div className="space-y-3">
            {group.items.map((item, i) => (
              <div
                key={item.key}
                className={`flex items-start justify-between gap-4 py-2.5 ${
                  i < group.items.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div>
                  <p className="text-sm text-white" style={{ fontWeight: 500 }}>{item.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${prefs[item.key] ? "bg-[#D4A853]" : "bg-white/15"}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${prefs[item.key] ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BillingTab() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (!user) {
    return <div className="p-4 text-white/50">Loading...</div>;
  }

  return (
    <div className="space-y-5">
      {/* Current Plan */}
      <div className="p-5 rounded-xl bg-[#D4A853]/8 border border-[#D4A853]/20">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown size={16} className="text-[#D4A853]" />
              <span className="text-[#D4A853]" style={{ fontWeight: 700 }}>Premium Plan</span>
            </div>
            <p className="text-sm text-white/60">₦2,500/month · Next billing: April 6, 2026</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs border border-emerald-500/20" style={{ fontWeight: 600 }}>
            Active
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 rounded-lg border border-[#D4A853]/25 text-[#D4A853] text-sm hover:bg-[#D4A853]/8 transition-colors" style={{ fontWeight: 500 }}>
            Manage Plan
          </button>
          <button className="py-2 rounded-lg border border-red-500/20 text-red-400 text-sm hover:bg-red-500/8 transition-colors" style={{ fontWeight: 500 }}>
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-white/2 border border-white/6 rounded-xl p-5">
        <h3 className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>Plan Usage</h3>
        {[
          { label: "Digital Accounts", used: 4, limit: "Unlimited", pct: 20 },
          { label: "Crypto Wallets", used: 2, limit: "Unlimited", pct: 10 },
          { label: "Storage", used: "7.3 MB", limit: "5 GB", pct: 1 },
          { label: "Beneficiaries", used: 3, limit: 10, pct: 30 },
        ].map((item) => (
          <div key={item.label} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/60">{item.label}</span>
              <span className="text-xs text-white/40">
                {item.used} / {item.limit}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/6">
              <div
                className="h-full rounded-full bg-[#D4A853]/70"
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Invoice History */}
      <div className="bg-white/2 border border-white/6 rounded-xl p-5">
        <h3 className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>Invoice History</h3>
        {[
          { date: "Mar 6, 2026", amount: "₦2,500", status: "Paid" },
          { date: "Feb 6, 2026", amount: "₦2,500", status: "Paid" },
          { date: "Jan 6, 2026", amount: "₦2,500", status: "Paid" },
        ].map((inv) => (
          <div key={inv.date} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div>
              <p className="text-sm text-white" style={{ fontWeight: 500 }}>{inv.date}</p>
              <p className="text-xs text-white/40">Premium Plan · Monthly</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white">{inv.amount}</span>
              <span className="text-xs text-emerald-400">{inv.status}</span>
              <button className="text-xs text-[#D4A853] hover:text-[#E8BC6A]">Download</button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/pricing")}
          className="text-sm text-[#D4A853] hover:text-[#E8BC6A] transition-colors"
          style={{ fontWeight: 500 }}
        >
          View all plans →
        </button>
      </div>
    </div>
  );
}

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabComponents: Record<Tab, ReactNode> = {
    profile: <ProfileTab />,
    security: <SecurityTab />,
    notifications: <NotificationsTab />,
    billing: <BillingTab />,
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center gap-2.5 mb-6">
        <SettingsIcon size={20} className="text-white/50" />
        <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.375rem" }}>
          Settings
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 border border-white/8 rounded-xl mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id
                ? "bg-[#141929] text-white shadow-sm border border-white/8"
                : "text-white/50 hover:text-white"
            }`}
            style={{ fontWeight: activeTab === tab.id ? 600 : 400 }}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {tabComponents[activeTab]}
    </div>
  );
}
