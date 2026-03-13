import { Outlet } from "react-router";
import { Bell, Menu, Shield } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { AppProvider, useApp } from "../../providers/AppProvider";
import { useAuth } from "../../providers/AuthProvider";
import { VaultaLogo } from "../../../components/VaultaLogo";

function LayoutInner() {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const { user } = useAuth();

  // If not authenticated, show loading (should redirect in real app)
  if (!user) {
    return (
      <div className="flex h-screen bg-[#0B0F1A] items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0B0F1A] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full z-10">
            <Sidebar mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between px-4 md:px-6 h-14 border-b border-white/8 bg-[#0B0F1A]/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="md:hidden">
              <VaultaLogo size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Vault Health Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
              <Shield size={13} className="text-[#D4A853]" />
              <span className="text-xs text-white/60">Vault Health</span>
              <span
                className={`text-xs ${
                  user.vaultHealth >= 80
                    ? "text-emerald-400"
                    : user.vaultHealth >= 60
                    ? "text-[#D4A853]"
                    : "text-red-400"
                }`}
                style={{ fontWeight: 600 }}
              >
                {user.vaultHealth}%
              </span>
            </div>

            {/* Plan Badge */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
                user.plan === "premium"
                  ? "bg-[#D4A853]/15 text-[#D4A853] border border-[#D4A853]/25"
                  : "bg-white/5 text-white/40 border border-white/10"
              }`}
              style={{ fontWeight: 600 }}
            >
              {user.plan === "premium" ? "⭐ Premium" : user.plan === "enterprise" ? "🏢 Enterprise" : "Free"}
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 border border-[#D4A853]/30 flex items-center justify-center text-[#D4A853] text-xs cursor-pointer" style={{ fontWeight: 600 }}>
              {user.avatarInitials}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <AppProvider>
      <LayoutInner />
    </AppProvider>
  );
}
