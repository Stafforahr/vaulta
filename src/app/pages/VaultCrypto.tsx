import { useState } from "react";
import { Bitcoin, Plus, Eye, EyeOff, Copy, Trash2, Lock, X, AlertTriangle, CheckCircle } from "lucide-react";
import { useApp } from "../providers/AppProvider";
import type { CryptoWallet } from "../../types";

const networkColors: Record<string, string> = {
  Bitcoin: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Ethereum: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Solana: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  BNB: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Other: "bg-white/5 text-white/40 border-white/10",
};

const networkIcons: Record<string, string> = {
  Bitcoin: "₿",
  Ethereum: "Ξ",
  Solana: "◎",
  BNB: "B",
  Other: "?",
};

function CryptoCard({ wallet, onDelete }: { wallet: CryptoWallet; onDelete: (id: string) => void }) {
  const [showSeed, setShowSeed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copySeed = () => {
    navigator.clipboard.writeText(wallet.seedPhrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const words = wallet.seedPhrase.split(" ");

  return (
    <div className="bg-[#141929] border border-white/6 rounded-xl p-5 hover:border-white/10 transition-all">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/15 flex items-center justify-center text-lg text-orange-400">
            {networkIcons[wallet.type] || "?"}
          </div>
          <div>
            <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
              {wallet.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${networkColors[wallet.type] || networkColors.Other}`}>
              {wallet.network}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-[#D4A853]" style={{ fontWeight: 700 }}>
            {wallet.estimatedValue}
          </p>
          <p className="text-xs text-white/30">est. value</p>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="mb-3 p-3 rounded-lg bg-white/3 border border-white/6">
        <p className="text-xs text-white/40 mb-1">Wallet Address</p>
        <p className="text-xs text-white/70 font-mono break-all leading-relaxed">
          {wallet.walletAddress}
        </p>
      </div>

      {/* Seed Phrase */}
      <div className="p-3 rounded-lg bg-amber-500/6 border border-amber-500/12">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={12} className="text-amber-400" />
            <p className="text-xs text-amber-300" style={{ fontWeight: 600 }}>
              Recovery Phrase (12 words)
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={copySeed}
              className="p-1.5 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
              title="Copy seed phrase"
            >
              {copied ? <CheckCircle size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
            <button
              onClick={() => setShowSeed((s) => !s)}
              className="p-1.5 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
            >
              {showSeed ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
        </div>

        {showSeed ? (
          <div className="grid grid-cols-4 gap-1.5">
            {words.map((word, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/8"
              >
                <span className="text-xs text-white/30">{i + 1}.</span>
                <span className="text-xs text-white font-mono">{word}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5">
            {words.map((_, i) => (
              <div
                key={i}
                className="h-7 rounded bg-white/5 border border-white/8"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <Lock size={11} className="text-emerald-400" />
          <span className="text-xs text-white/30">AES-256 encrypted</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onDelete(wallet.id)}
            className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/8 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AddWalletModal({ onClose, onAdd }: { onClose: () => void; onAdd: (w: CryptoWallet) => void }) {
  const [form, setForm] = useState({
    name: "",
    type: "Bitcoin",
    walletAddress: "",
    seedPhrase: "",
    estimatedValue: "",
    network: "Bitcoin Mainnet",
  });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `crypto_${Date.now()}`,
      ...form,
      encrypted: true,
      createdAt: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141929] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white" style={{ fontWeight: 600 }}>Add Crypto Wallet</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5">
            <X size={16} />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-amber-500/8 border border-amber-500/15 flex gap-2">
          <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300/80 leading-relaxed">
            Your seed phrase is encrypted client-side before storage. Never share it with anyone. This data is for your beneficiaries only.
          </p>
        </div>

        <form onSubmit={handle} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/50 mb-1">Wallet Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="My Bitcoin Wallet"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Network</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value, network: `${e.target.value} Mainnet` }))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all"
              >
                {["Bitcoin", "Ethereum", "Solana", "BNB", "Other"].map((n) => (
                  <option key={n} value={n} className="bg-[#141929]">{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Wallet Address</label>
            <input
              value={form.walletAddress}
              onChange={(e) => setForm((f) => ({ ...f, walletAddress: e.target.value }))}
              placeholder="bc1q... or 0x..."
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Seed Phrase / Recovery Phrase *</label>
            <textarea
              required
              value={form.seedPhrase}
              onChange={(e) => setForm((f) => ({ ...f, seedPhrase: e.target.value }))}
              placeholder="Enter your 12 or 24 word seed phrase, separated by spaces..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all resize-none"
            />
            <p className="text-xs text-white/30 mt-1">
              {form.seedPhrase.trim().split(/\s+/).filter(Boolean).length} words entered
            </p>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Estimated Value (optional)</label>
            <input
              value={form.estimatedValue}
              onChange={(e) => setForm((f) => ({ ...f, estimatedValue: e.target.value }))}
              placeholder="₦ 0"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
              Save Wallet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function VaultCrypto() {
  const { cryptoWallets, addCryptoWallet, deleteCryptoWallet } = useApp();
  const [showModal, setShowModal] = useState(false);

  const totalEstimated = "₦ 6,050,000";

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {showModal && (
        <AddWalletModal onClose={() => setShowModal(false)} onAdd={addCryptoWallet} />
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Bitcoin size={20} className="text-orange-400" />
            <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.375rem" }}>
              Crypto Wallets
            </h1>
          </div>
          <p className="text-sm text-white/50">
            {cryptoWallets.length} wallet{cryptoWallets.length !== 1 ? "s" : ""} · Est. total: {totalEstimated}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors flex-shrink-0"
          style={{ fontWeight: 600, fontSize: "0.875rem" }}
        >
          <Plus size={16} />
          Add Wallet
        </button>
      </div>

      {/* Warning Banner */}
      <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-amber-500/6 border border-amber-500/12">
        <AlertTriangle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-300/80 leading-relaxed">
          <span style={{ fontWeight: 600 }}>Critical: </span>
          Crypto assets are irreversibly lost without recovery phrases. Securing them here ensures your beneficiaries can access your wallets.
        </p>
      </div>

      {cryptoWallets.length === 0 ? (
        <div className="text-center py-16 bg-[#141929] border border-white/6 rounded-2xl">
          <Bitcoin size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/50 mb-1" style={{ fontWeight: 500 }}>No wallets secured yet</p>
          <p className="text-sm text-white/30 mb-4">Don't let your crypto become inaccessible</p>
          <button onClick={() => setShowModal(true)} className="px-5 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
            <Plus size={14} className="inline mr-1.5" />
            Add Wallet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cryptoWallets.map((wallet) => (
            <CryptoCard key={wallet.id} wallet={wallet} onDelete={deleteCryptoWallet} />
          ))}
        </div>
      )}
    </div>
  );
}
