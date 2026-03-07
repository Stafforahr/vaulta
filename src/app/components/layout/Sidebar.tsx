import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  KeyRound,
  Bitcoin,
  FileText,
  MessageSquareHeart,
  Users,
  Zap,
  Settings,
  ChevronRight,
  Shield,
  X,
  Crown,
  LogOut,
} from "lucide-react";
import { VaultaLogo } from "../VaultaLogo";
import { useApp } from "../../providers/AppProvider";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/app",
    end: true,
  },
  {
    label: "Vault",
    icon: Shield,
    isSection: true,
    children: [
      { label: "Digital Accounts", icon: KeyRound, to: "/app/vault/accounts" },
      { label: "Crypto Wallets", icon: Bitcoin, to: "/app/vault/crypto" },
      { label: "Legal Documents", icon: FileText, to: "/app/vault/documents" },
      { label: "Personal Messages", icon: MessageSquareHeart, to: "/app/vault/messages" },
    ],
  },
  {
    label: "Beneficiaries",
    icon: Users,
    to: "/app/beneficiaries",
  },
  {
    label: "Trigger Settings",
    icon: Zap,
    to: "/app/triggers",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/app/settings",
  },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const { user } = useApp();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
      isActive
        ? "bg-[#D4A853]/15 text-[#D4A853] border border-[#D4A853]/25"
        : "text-white/60 hover:text-white hover:bg-white/5"
    }`;

  return (
    <aside className="flex flex-col h-full bg-[#0D1220] border-r border-white/8 w-64">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
        <VaultaLogo size="sm" />
        {mobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          if (item.isSection) {
            return (
              <div key={item.label} className="pt-2">
                <p className="px-3 pb-1.5 text-xs text-white/30 uppercase tracking-widest">
                  {item.label}
                </p>
                <div className="space-y-0.5">
                  {item.children?.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={linkClass}
                      onClick={mobile ? onClose : undefined}
                    >
                      <child.icon size={16} />
                      <span>{child.label}</span>
                      <ChevronRight
                        size={14}
                        className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity"
                      />
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to!}
              end={item.end}
              className={linkClass}
              onClick={mobile ? onClose : undefined}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Plan Badge */}
      {user.plan === "free" && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20">
          <div className="flex items-center gap-2 mb-1.5">
            <Crown size={14} className="text-[#D4A853]" />
            <span className="text-xs text-[#D4A853]" style={{ fontWeight: 600 }}>
              Upgrade to Premium
            </span>
          </div>
          <p className="text-xs text-white/50 mb-2">
            Unlock unlimited assets, crypto wallets & priority support.
          </p>
          <button
            onClick={() => navigate("/pricing")}
            className="w-full py-1.5 rounded-lg text-xs bg-[#D4A853] text-[#0B0F1A] transition-opacity hover:opacity-90"
            style={{ fontWeight: 600 }}
          >
            Upgrade Now
          </button>
        </div>
      )}

      {/* User */}
      <div className="px-4 py-3 border-t border-white/8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 border border-[#D4A853]/30 flex items-center justify-center text-[#D4A853] text-xs flex-shrink-0" style={{ fontWeight: 600 }}>
          {user.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white truncate" style={{ fontWeight: 500 }}>
            {user.name.split(" ")[0]}
          </p>
          <p className="text-xs text-white/40 truncate">{user.email}</p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="p-1.5 rounded-lg text-white/30 hover:text-white/70 transition-colors"
          title="Sign out"
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
