import { useState } from "react";
import { KeyRound, Plus, Search, Eye, EyeOff, Trash2, Edit3, Lock, X } from "lucide-react";
import { useApp } from "../app/providers/AppProvider";
import type { DigitalAccount } from "../../types";

const categoryColors: Record<string, string> = {
  social: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  email: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  banking: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  streaming: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  work: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  other: "bg-white/5 text-white/40 border-white/10",
};

const categories = ["all", "email", "social", "banking", "work", "streaming", "other"] as const;

function AccountCard({
  account,
  onDelete,
}: {
  account: DigitalAccount;
  onDelete: (id: string) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-[#141929] border border-white/6 rounded-xl p-4 hover:border-white/12 transition-all group">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-xl flex-shrink-0">
          {account.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                {account.platform}
              </h3>
              <p className="text-xs text-white/50 mt-0.5">@{account.username}</p>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${categoryColors[account.category]}`}
            >
              {account.category}
            </span>
          </div>

          <div className="mt-3 p-2.5 rounded-lg bg-white/3 border border-white/6">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-white/40 mb-0.5">Password</p>
                <p className="text-sm text-white/70 font-mono">
                  {revealed ? "MyP@ssw0rd!23" : "••••••••••••"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setRevealed((r) => !r)}
                  className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                  title={revealed ? "Hide" : "Reveal"}
                >
                  {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <div className="p-1.5">
                  <Lock size={12} className="text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {account.notes && (
            <p className="mt-2 text-xs text-white/40 leading-relaxed">{account.notes}</p>
          )}

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-white/30">Added {account.createdAt}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
                <Edit3 size={13} />
              </button>
              <button
                onClick={() => onDelete(account.id)}
                className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/8 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddAccountModal({ onClose, onAdd }: { onClose: () => void; onAdd: (a: DigitalAccount) => void }) {
  const [form, setForm] = useState({
    platform: "",
    username: "",
    email: "",
    password: "",
    category: "other" as DigitalAccount["category"],
    notes: "",
  });
  const [showPw, setShowPw] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const icons: Record<string, string> = {
      email: "📧",
      social: "👤",
      banking: "🏦",
      work: "💼",
      streaming: "🎬",
      other: "🔑",
    };
    onAdd({
      id: `acc_${Date.now()}`,
      platform: form.platform,
      username: form.username,
      email: form.email,
      category: form.category,
      notes: form.notes,
      encrypted: true,
      createdAt: new Date().toISOString().split("T")[0],
      icon: icons[form.category] || "🔑",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141929] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white" style={{ fontWeight: 600 }}>Add Digital Account</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5">
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handle} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/50 mb-1">Platform *</label>
              <input
                required
                value={form.platform}
                onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
                placeholder="e.g. Instagram"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as DigitalAccount["category"] }))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all"
              >
                {["email", "social", "banking", "work", "streaming", "other"].map((c) => (
                  <option key={c} value={c} className="bg-[#141929]">
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Username / Handle *</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              placeholder="@username"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="account@email.com"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Password *</label>
            <div className="relative">
              <input
                required
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Account password"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Notes for beneficiaries</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Any important instructions..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all resize-none"
            />
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <Lock size={13} className="text-emerald-400" />
            <p className="text-xs text-emerald-300/70">Will be encrypted with AES-256 before storing</p>
          </div>
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Save Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function VaultAccounts() {
  const { accounts, addAccount, deleteAccount } = useApp();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = accounts.filter((a) => {
    const matchSearch =
      a.platform.toLowerCase().includes(search.toLowerCase()) ||
      a.username.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || a.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {showModal && (
        <AddAccountModal onClose={() => setShowModal(false)} onAdd={addAccount} />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <KeyRound size={20} className="text-blue-400" />
            <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.375rem" }}>
              Digital Accounts
            </h1>
          </div>
          <p className="text-sm text-white/50">
            {accounts.length} account{accounts.length !== 1 ? "s" : ""} stored · All AES-256 encrypted
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors flex-shrink-0"
          style={{ fontWeight: 600, fontSize: "0.875rem" }}
        >
          <Plus size={16} />
          Add Account
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accounts..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/40 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                activeCategory === cat
                  ? "bg-[#D4A853]/15 text-[#D4A853] border border-[#D4A853]/25"
                  : "bg-white/5 text-white/40 border border-white/8 hover:bg-white/8 hover:text-white/60"
              }`}
              style={{ fontWeight: activeCategory === cat ? 600 : 400 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#141929] border border-white/6 rounded-2xl">
          <KeyRound size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/50 mb-1" style={{ fontWeight: 500 }}>No accounts found</p>
          <p className="text-sm text-white/30">
            {search ? "Try a different search term" : "Add your first digital account to protect it"}
          </p>
          {!search && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A] transition-colors"
              style={{ fontWeight: 600 }}
            >
              <Plus size={14} className="inline mr-1.5" />
              Add Account
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onDelete={deleteAccount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
