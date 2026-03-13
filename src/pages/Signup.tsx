import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { VaultaLogo } from "../components/VaultaLogo";
import { supabase } from "../services/supabase";

const passwordChecks = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    plan: "free" as "free" | "premium",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const passChecks = passwordChecks.map((c) => ({ ...c, passed: c.test(form.password) }));

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setError("");
    setLoading(true);
    setStep(2);
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setError("");
    setLoading(true);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    navigate("/app");
  };

  const handleOtpInput = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4 py-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D4A853]/4 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md">
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
            {step === 1 ? "Create Your Vault" : "Verify Your Number"}
          </h1>
          <p className="text-white/50 text-sm">
            {step === 1
              ? "Secure your digital legacy in minutes"
              : `We sent a 6-digit code to ${form.phone}`}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                s <= step ? "bg-[#D4A853]" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="bg-[#141929] border border-white/8 rounded-2xl p-8">
          {step === 1 ? (
            <form onSubmit={handleStep1} className="space-y-4">
              {/* Plan selection */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                {(["free", "premium"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => update("plan", p)}
                    className={`py-2.5 px-4 rounded-xl border text-sm transition-all ${
                      form.plan === p
                        ? "bg-[#D4A853]/12 border-[#D4A853]/40 text-[#D4A853]"
                        : "bg-white/3 border-white/10 text-white/50 hover:bg-white/6"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {p === "free" ? "Free Plan" : "⭐ Premium"}
                  </button>
                ))}
              </div>
              {form.plan === "premium" && (
                <p className="text-xs text-[#D4A853]/70 text-center -mt-1">
                  ₦2,500/month • 7-day free trial
                </p>
              )}

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Full name</label>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Adebayo Okafor"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Email address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Phone number</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+234 801 234 5678"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all text-sm pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    {passChecks.map((c) => (
                      <div key={c.label} className="flex items-center gap-1.5">
                        <CheckCircle
                          size={11}
                          className={c.passed ? "text-emerald-400" : "text-white/20"}
                        />
                        <span
                          className={`text-xs ${c.passed ? "text-emerald-400" : "text-white/30"}`}
                        >
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 accent-[#D4A853]"
                />
                <span className="text-sm text-white/50 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#D4A853] hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-[#D4A853] hover:underline">Privacy Policy</a>
                </span>
              </label>

              <button
                type="submit"
                disabled={!form.agreeTerms || passChecks.filter(c => !c.passed).length > 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontWeight: 700 }}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtp} className="space-y-6">
              <p className="text-sm text-white/50 text-center">
                Enter the 6-digit code we sent via SMS to verify your account.
              </p>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    className="w-11 h-12 text-center text-lg text-white bg-white/5 border border-white/15 rounded-xl focus:outline-none focus:border-[#D4A853]/60 transition-all"
                    style={{ fontWeight: 600 }}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-white/40">
                Didn't receive it?{" "}
                <button type="button" className="text-[#D4A853]" style={{ fontWeight: 500 }}>
                  Resend code
                </button>
              </p>
              <button
                type="submit"
                disabled={otp.some((d) => !d) || loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-all disabled:opacity-40"
                style={{ fontWeight: 700 }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#0B0F1A]/30 border-t-[#0B0F1A] rounded-full animate-spin" />
                ) : (
                  <>Verify & Enter Vault</>
                )}
              </button>
            </form>
          )}

          <div className="mt-5 flex items-center gap-2 p-3 rounded-lg bg-white/3 border border-white/6">
            <Shield size={14} className="text-emerald-400 flex-shrink-0" />
            <p className="text-xs text-white/40">
              256-bit encryption. Your data is encrypted before it leaves your device.
            </p>
          </div>
        </div>

        <p className="text-center mt-5 text-sm text-white/40">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#D4A853] hover:text-[#E8BC6A]"
            style={{ fontWeight: 500 }}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
