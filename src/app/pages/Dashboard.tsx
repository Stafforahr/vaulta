import { useNavigate } from "react-router";
import {
  Shield,
  KeyRound,
  Bitcoin,
  FileText,
  MessageSquareHeart,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useApp } from "../providers/AppProvider";

const activityLog = [
  { action: "Beneficiary verified", detail: "Ngozi Okafor confirmed identity", time: "2h ago", type: "success" },
  { action: "Document uploaded", detail: "Life Insurance Policy added", time: "1d ago", type: "info" },
  { action: "Check-in reminder sent", detail: "SMS sent to +234 801 234 5678", time: "3d ago", type: "warning" },
  { action: "Account added", detail: "GTBank Online Banking secured", time: "5d ago", type: "success" },
  { action: "Vault accessed", detail: "Login from Lagos, Nigeria", time: "1w ago", type: "info" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { user, accounts, cryptoWallets, documents, messages, beneficiaries, triggerConfig } = useApp();

  const healthTasks = [
    { label: "Add a legal will document", done: documents.some(d => d.type === "will"), link: "/app/vault/documents" },
    { label: "Assign all beneficiaries", done: beneficiaries.every(b => b.status === "verified"), link: "/app/beneficiaries" },
    { label: "Configure trigger settings", done: triggerConfig.inactivityPeriod > 0, link: "/app/triggers" },
    { label: "Add emergency contact", done: beneficiaries.some(b => b.role === "trusted_contact"), link: "/app/beneficiaries" },
    { label: "Add a personal message", done: messages.length > 0, link: "/app/vault/messages" },
  ];

  const doneTasks = healthTasks.filter(t => t.done).length;

  const vaultSections = [
    {
      label: "Digital Accounts",
      count: accounts.length,
      icon: KeyRound,
      to: "/app/vault/accounts",
      color: "blue",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/15",
    },
    {
      label: "Crypto Wallets",
      count: cryptoWallets.length,
      icon: Bitcoin,
      to: "/app/vault/crypto",
      color: "orange",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/15",
    },
    {
      label: "Legal Documents",
      count: documents.length,
      icon: FileText,
      to: "/app/vault/documents",
      color: "purple",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/15",
    },
    {
      label: "Personal Messages",
      count: messages.length,
      icon: MessageSquareHeart,
      to: "/app/vault/messages",
      color: "pink",
      bgColor: "bg-pink-500/10",
      iconColor: "text-pink-400",
      borderColor: "border-pink-500/15",
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="mb-7">
        <h1
          className="text-white mb-1"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.5rem" }}
        >
          Good morning, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-white/50">
          Your vault is active · Last check-in: {user.lastCheckin}
        </p>
      </div>

      {/* Alert Banner */}
      {beneficiaries.some((b) => b.status === "pending") && (
        <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
          <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-amber-300" style={{ fontWeight: 500 }}>
              {beneficiaries.filter((b) => b.status === "pending").length} beneficiar
              {beneficiaries.filter((b) => b.status === "pending").length === 1 ? "y" : "ies"} pending verification
            </p>
            <p className="text-xs text-amber-300/70 mt-0.5">
              Pending beneficiaries cannot receive assets. Send a reminder to complete verification.
            </p>
          </div>
          <button
            onClick={() => navigate("/app/beneficiaries")}
            className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex-shrink-0"
            style={{ fontWeight: 600 }}
          >
            Resolve →
          </button>
        </div>
      )}

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Vault Health */}
        <div className="col-span-2 lg:col-span-1 p-4 rounded-xl bg-[#141929] border border-white/6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Vault Health</span>
            <Shield size={15} className="text-[#D4A853]" />
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span
              className="text-[#D4A853]"
              style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}
            >
              {user.vaultHealth}%
            </span>
            <span className="text-xs text-white/40 mb-1">{doneTasks}/{healthTasks.length} tasks</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D4A853] to-[#E8BC6A] transition-all duration-700"
              style={{ width: `${user.vaultHealth}%` }}
            />
          </div>
        </div>

        {/* Beneficiaries */}
        <div className="p-4 rounded-xl bg-[#141929] border border-white/6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Beneficiaries</span>
            <Users size={15} className="text-emerald-400" />
          </div>
          <p className="text-white mb-1" style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>
            {beneficiaries.length}
          </p>
          <p className="text-xs text-white/40">
            {beneficiaries.filter((b) => b.status === "verified").length} verified
          </p>
        </div>

        {/* Trigger Status */}
        <div className="p-4 rounded-xl bg-[#141929] border border-white/6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Trigger</span>
            <Zap size={15} className="text-purple-400" />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400" style={{ fontWeight: 600 }}>
              Active
            </span>
          </div>
          <p className="text-xs text-white/40">
            {triggerConfig.inactivityPeriod}d inactivity rule
          </p>
        </div>

        {/* Assets */}
        <div className="p-4 rounded-xl bg-[#141929] border border-white/6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Total Assets</span>
            <TrendingUp size={15} className="text-blue-400" />
          </div>
          <p className="text-white mb-1" style={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>
            {accounts.length + cryptoWallets.length + documents.length + messages.length}
          </p>
          <p className="text-xs text-white/40">Stored in vault</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left: Vault Sections + Activity */}
        <div className="lg:col-span-2 space-y-5">
          {/* Vault Quick Access */}
          <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white" style={{ fontWeight: 600 }}>Your Vault</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {vaultSections.map((section) => (
                <button
                  key={section.label}
                  onClick={() => navigate(section.to)}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${section.bgColor} ${section.borderColor} hover:opacity-90 transition-all group text-left`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5`}>
                    <section.icon size={18} className={section.iconColor} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/50 mb-0.5">{section.label}</p>
                    <p className="text-white" style={{ fontWeight: 600 }}>
                      {section.count}{" "}
                      <span className="text-white/40" style={{ fontWeight: 400, fontSize: "0.75rem" }}>
                        stored
                      </span>
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="ml-auto text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-white/40" />
                <h2 className="text-white" style={{ fontWeight: 600 }}>Recent Activity</h2>
              </div>
            </div>
            <div className="space-y-1">
              {activityLog.map((log, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2.5 border-b border-white/4 last:border-0"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                      log.type === "success"
                        ? "bg-emerald-400"
                        : log.type === "warning"
                        ? "bg-amber-400"
                        : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white" style={{ fontWeight: 500 }}>
                      {log.action}
                    </p>
                    <p className="text-xs text-white/40">{log.detail}</p>
                  </div>
                  <span className="text-xs text-white/30 flex-shrink-0 mt-0.5">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Vault Health Checklist + Beneficiaries */}
        <div className="space-y-5">
          {/* Health Checklist */}
          <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={16} className="text-[#D4A853]" />
              <h2 className="text-white" style={{ fontWeight: 600 }}>Vault Checklist</h2>
            </div>
            <div className="space-y-2.5">
              {healthTasks.map((task) => (
                <button
                  key={task.label}
                  onClick={() => navigate(task.link)}
                  className="w-full flex items-center gap-3 py-2 hover:bg-white/3 rounded-lg px-1 transition-colors group text-left"
                >
                  <CheckCircle
                    size={16}
                    className={task.done ? "text-emerald-400 flex-shrink-0" : "text-white/15 flex-shrink-0"}
                  />
                  <span
                    className={`text-sm flex-1 ${
                      task.done ? "text-white/40 line-through" : "text-white/70"
                    }`}
                  >
                    {task.label}
                  </span>
                  {!task.done && (
                    <ArrowRight size={12} className="text-white/20 group-hover:text-white/50 transition-colors" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/6 text-center">
              <p className="text-xs text-white/40">
                {healthTasks.length - doneTasks} task{healthTasks.length - doneTasks !== 1 ? "s" : ""} remaining to reach 100%
              </p>
            </div>
          </div>

          {/* Beneficiaries Preview */}
          <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-white/40" />
                <h2 className="text-white" style={{ fontWeight: 600 }}>Beneficiaries</h2>
              </div>
              <button
                onClick={() => navigate("/app/beneficiaries")}
                className="text-xs text-[#D4A853] hover:text-[#E8BC6A] transition-colors"
              >
                Manage
              </button>
            </div>
            <div className="space-y-3">
              {beneficiaries.map((ben) => (
                <div key={ben.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center text-xs text-[#D4A853] flex-shrink-0" style={{ fontWeight: 600 }}>
                    {ben.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate" style={{ fontWeight: 500 }}>
                      {ben.name}
                    </p>
                    <p className="text-xs text-white/40">{ben.relationship}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      ben.status === "verified"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-amber-400/10 text-amber-400"
                    }`}
                  >
                    <div className="w-1 h-1 rounded-full bg-current" />
                    {ben.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Check-in CTA */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#D4A853]/12 to-[#D4A853]/5 border border-[#D4A853]/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-[#D4A853]" />
              <span className="text-sm text-[#D4A853]" style={{ fontWeight: 600 }}>
                Check-in Due
              </span>
            </div>
            <p className="text-xs text-white/50 mb-3">
              Your next scheduled check-in is in{" "}
              <span className="text-white" style={{ fontWeight: 500 }}>27 days</span>.
              Check in now to keep your vault active.
            </p>
            <button className="w-full py-2 rounded-lg bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A] transition-colors" style={{ fontWeight: 600 }}>
              ✓ Check In Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
