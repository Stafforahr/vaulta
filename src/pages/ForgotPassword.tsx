import { useState } from "react";
import { useNavigate } from "react-router";
import { VaultaLogo } from "../components/VaultaLogo";
import { ArrowLeft, Lock, Mail, CheckCircle, AlertCircle } from "lucide-react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API call to send reset email
    // In production, this would call Supabase's resetPasswordEmail or your auth API
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Background decorations */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#D4A853]/4 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-blue-500/4 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative">
          {/* Success Card */}
          <div className="bg-[#141929] border border-white/8 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
            
            <h1
              className="text-white mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Check Your Email
            </h1>
            <p className="text-white/50 text-sm mb-6">
              We've sent password reset instructions to <br />
              <span className="text-white">{email}</span>
            </p>

            <div className="p-4 rounded-xl bg-white/3 border border-white/6 mb-6">
              <p className="text-xs text-white/40 leading-relaxed">
                Didn't receive the email? Check your spam folder, or{" "}
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="text-[#D4A853] hover:text-[#E8BC6A] transition-colors"
                >
                  try again
                </button>
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 mx-auto text-sm text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#D4A853]/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-blue-500/4 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <VaultaLogo size="lg" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-[#D4A853]" />
          </div>
          <h1
            className="text-white mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.625rem",
              fontWeight: 600,
            }}
          >
            Reset Your Password
          </h1>
          <p className="text-white/50 text-sm">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#141929] border border-white/8 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Email address</label>
              <div className="relative">
                <Mail 
                  size={16} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 focus:bg-white/8 transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/8 border border-red-500/15">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

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
                  Send Reset Link
                  <Mail size={16} />
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 rounded-xl bg-white/3 border border-white/6">
            <p className="text-xs text-white/40 leading-relaxed text-center">
              If you're having trouble, contact our{" "}
              <button className="text-[#D4A853] hover:text-[#E8BC6A] transition-colors">
                support team
              </button>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/25">
            For security reasons, we never include your actual password in reset emails.
          </p>
        </div>
      </div>
    </div>
  );
}

