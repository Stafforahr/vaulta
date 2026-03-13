import { useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  Shield,
  Crown,
  X,
  Send,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "../app/providers/AppProvider";
import type { Beneficiary } from "../../types";

const roleConfig = {
  heir: {
    label: "Heir",
    icon: Crown,
    color: "text-[#D4A853]",
    bg: "bg-[#D4A853]/10",
    border: "border-[#D4A853]/20",
    desc: "Receives assigned assets upon trigger",
  },
  trusted_contact: {
    label: "Trusted Contact",
    icon: Shield,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    desc: "Confirms trigger events (2-of-3 rule)",
  },
  executor: {
    label: "Legal Executor",
    icon: CheckCircle,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    desc: "Manages legal distribution of assets",
  },
};

function BeneficiaryCard({
  ben,
  onDelete,
}: {
  ben: Beneficiary;
  onDelete: (id: string) => void;
}) {
  const config = roleConfig[ben.role];
  const RoleIcon = config.icon;
  const initials = ben.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="bg-[#141929] border border-white/6 rounded-xl p-5 hover:border-white/10 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center text-sm text-[#D4A853] flex-shrink-0" style={{ fontWeight: 700 }}>
            {initials}
          </div>
          <div>
            <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
              {ben.name}
            </h3>
            <p className="text-xs text-white/40">{ben.relationship}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs ${config.bg} ${config.border} ${config.color}`}
          >
            <RoleIcon size={11} />
            {config.label}
          </div>
          <button
            onClick={() => onDelete(ben.id)}
            className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/8 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Mail size={12} />
          <span>{ben.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Phone size={12} />
          <span>{ben.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
            ben.status === "verified"
              ? "bg-emerald-500/10 text-emerald-400"
              : ben.status === "pending"
              ? "bg-amber-500/10 text-amber-400"
              : "bg-white/5 text-white/40"
          }`}
        >
          {ben.status === "verified" ? (
            <CheckCircle size={11} />
          ) : (
            <Clock size={11} />
          )}
          {ben.status.charAt(0).toUpperCase() + ben.status.slice(1)}
        </div>

        {ben.status !== "verified" && (
          <button className="flex items-center gap-1.5 text-xs text-[#D4A853] hover:text-[#E8BC6A] transition-colors">
            <Send size={11} />
            Send Reminder
          </button>
        )}
      </div>

      {ben.assets.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-xs text-white/30">
            {ben.assets.length} asset{ben.assets.length !== 1 ? "s" : ""} assigned
          </p>
        </div>
      )}
    </div>
  );
}

function AddBeneficiaryModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (b: Beneficiary) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    relationship: "",
    email: "",
    phone: "",
    role: "heir" as Beneficiary["role"],
  });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `ben_${Date.now()}`,
      ...form,
      status: "invited",
      assets: [],
      addedAt: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141929] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white" style={{ fontWeight: 600 }}>Add Beneficiary</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5">
            <X size={16} />
          </button>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {(Object.entries(roleConfig) as [Beneficiary["role"], typeof roleConfig[keyof typeof roleConfig]][]).map(
            ([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, role: key }))}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    form.role === key
                      ? `${config.bg} ${config.border} ${config.color}`
                      : "bg-white/3 border-white/8 text-white/40 hover:bg-white/6"
                  }`}
                >
                  <Icon size={16} className="mx-auto mb-1" />
                  <p className="text-xs" style={{ fontWeight: 600 }}>{config.label}</p>
                </button>
              );
            }
          )}
        </div>
        <p className="text-xs text-white/40 mb-4 text-center">
          {roleConfig[form.role].desc}
        </p>

        <form onSubmit={handle} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/50 mb-1">Full Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Relationship *</label>
              <input
                required
                value={form.relationship}
                onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value }))}
                placeholder="e.g. Spouse"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Email Address *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="their@email.com"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+234 800 000 0000"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/8 border border-blue-500/12">
            <AlertTriangle size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-300/80 leading-relaxed">
              An invitation email will be sent to verify their identity. They won't see your assets until verification.
            </p>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
              Add & Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Beneficiaries() {
  const { beneficiaries, addBeneficiary, deleteBeneficiary } = useApp();
  const [showModal, setShowModal] = useState(false);

  const verified = beneficiaries.filter((b) => b.status === "verified");
  const pending = beneficiaries.filter((b) => b.status !== "verified");
  const trustedContacts = beneficiaries.filter((b) => b.role === "trusted_contact");

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {showModal && (
        <AddBeneficiaryModal
          onClose={() => setShowModal(false)}
          onAdd={addBeneficiary}
        />
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Users size={20} className="text-[#D4A853]" />
            <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.375rem" }}>
              Beneficiaries
            </h1>
          </div>
          <p className="text-sm text-white/50">
            {beneficiaries.length} people · {verified.length} verified
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors flex-shrink-0"
          style={{ fontWeight: 600, fontSize: "0.875rem" }}
        >
          <Plus size={16} />
          Add Beneficiary
        </button>
      </div>

      {/* 2-of-3 Rule Banner */}
      <div className="mb-5 p-4 rounded-xl bg-emerald-500/6 border border-emerald-500/12">
        <div className="flex items-start gap-3">
          <Shield size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-emerald-300" style={{ fontWeight: 500 }}>
              2-of-3 Trusted Contact Verification Active
            </p>
            <p className="text-xs text-emerald-300/60 mt-1">
              You have {trustedContacts.length} trusted contact{trustedContacts.length !== 1 ? "s" : ""}. 
              {trustedContacts.length < 3
                ? ` Add ${3 - trustedContacts.length} more to meet the recommended minimum of 3 for the 2-of-3 verification rule.`
                : " The 2-of-3 rule is fully configured. At least 2 trusted contacts must confirm a trigger event."}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: beneficiaries.length, color: "text-white" },
          { label: "Verified", value: verified.length, color: "text-emerald-400" },
          { label: "Pending", value: pending.length, color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-xl bg-[#141929] border border-white/6 text-center">
            <p className={`text-xl ${s.color}`} style={{ fontWeight: 700 }}>
              {s.value}
            </p>
            <p className="text-xs text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {beneficiaries.length === 0 ? (
        <div className="text-center py-16 bg-[#141929] border border-white/6 rounded-2xl">
          <Users size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/50 mb-1" style={{ fontWeight: 500 }}>No beneficiaries yet</p>
          <p className="text-sm text-white/30 mb-4">Add the people who will inherit your digital assets</p>
          <button onClick={() => setShowModal(true)} className="px-5 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
            Add First Beneficiary
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beneficiaries.map((ben) => (
            <BeneficiaryCard key={ben.id} ben={ben} onDelete={deleteBeneficiary} />
          ))}
        </div>
      )}
    </div>
  );
}
