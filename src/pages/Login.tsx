import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Shield, ArrowRight, Fingerprint } from "lucide-react";
import { VaultaLogo } from "../components/VaultaLogo";
import { supabase } from "../services/supabase";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Successfully logged in, navigate to app
        navigate("/app");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#D4A853]/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-blue-500/4 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <VaultaLogo size="lg" />
          </div>
          <h1
            className="text-white mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.625rem",
              fontWeight: 600,
            }}
          >
            Welcome back
          </h1>
          <p className="text-white/50 text-sm">Sign in to access your vault</p>
        </div>

        {/* Card */}
        <div className="bg-[#141929] border border-white/8 rounded-2xl p-8">
          {/* Biometric Option */}
          <button className="w-full flex items-center justify-center gap-3 py-3 mb-5 rounded-xl border border-[#D4A853]/25 bg-[#D4A853]/8 text-[#D4A853] hover:bg-[#D4A853]/12 transition-colors group">
            <Fingerprint size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm" style={{ fontWeight: 600 }}>
              Sign in with Biometrics
            </span>
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/30">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 focus:bg-white/8 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 focus:bg-white/8 transition-all text-sm pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 accent-[#D4A853]" />
                <span className="text-sm text-white/50">Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-[#D4A853] hover:text-[#E8BC6A] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontWeight: 700 }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0B0F1A]/30 border-t-[#0B0F1A] rounded-full animate-spin" />
              ) : (
                <>
                  Sign in to Vault
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-5 flex items-center gap-2 p-3 rounded-lg bg-white/3 border border-white/6">
            <Shield size={14} className="text-emerald-400 flex-shrink-0" />
            <p className="text-xs text-white/40">
              Protected by AES-256 encryption. We never store your plaintext data.
            </p>
          </div>
        </div>

        <p className="text-center mt-5 text-sm text-white/40">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#D4A853] hover:text-[#E8BC6A] transition-colors"
            style={{ fontWeight: 500 }}
          >
            Create your vault
          </button>
        </p>

        <p className="text-center mt-3">
          <button
            onClick={() => navigate("/")}
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            ← Back to home
          </button>
        </p>
      </div>
    </div>
  );
}
