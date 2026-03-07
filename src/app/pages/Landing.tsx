import { useNavigate } from "react-router";
import {
  Shield,
  Lock,
  Users,
  Zap,
  FileText,
  Bitcoin,
  KeyRound,
  MessageSquareHeart,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
} from "lucide-react";
import { VaultaLogo } from "../components/VaultaLogo";

const HERO_IMAGE = "https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHklMjB2YXVsdCUyMHRlY2hub2xvZ3klMjBkYXJrfGVufDF8fHx8MTc3MjgzNzQzMXww&ixlib=rb-4.1.0&q=80&w=1080";
const FAMILY_IMAGE = "https://images.unsplash.com/photo-1714124731489-7eb16af0ac91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhJTIwZmFtaWx5JTIwbGVnYWN5JTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzcyODM3NDMxfDA&ixlib=rb-4.1.0&q=80&w=1080";

const features = [
  {
    icon: Lock,
    title: "AES-256 Encryption",
    desc: "Your data is encrypted client-side before it ever leaves your device. Zero-knowledge architecture.",
  },
  {
    icon: Users,
    title: "Trusted Beneficiaries",
    desc: "Assign heirs, trusted contacts, and executors. Control exactly who gets what.",
  },
  {
    icon: Zap,
    title: "Smart Trigger System",
    desc: "Multi-layer triggers: inactivity detection + 2-of-3 trusted contact death verification.",
  },
  {
    icon: Bitcoin,
    title: "Crypto Recovery",
    desc: "Securely store seed phrases and wallet keys. Prevent crypto inheritance loss.",
  },
  {
    icon: FileText,
    title: "Legal Documents",
    desc: "Wills, property deeds, insurance policies — all encrypted and assigned to beneficiaries.",
  },
  {
    icon: MessageSquareHeart,
    title: "Personal Messages",
    desc: "Leave text, audio, or video messages for loved ones — delivered only when triggered.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "/month",
    description: "For individuals getting started",
    features: [
      "Up to 3 digital accounts",
      "1 crypto wallet",
      "3 documents (10MB total)",
      "2 beneficiaries",
      "Email check-in",
      "Basic encryption",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₦2,500",
    period: "/month",
    description: "For individuals who want complete peace of mind",
    features: [
      "Unlimited digital accounts",
      "Unlimited crypto wallets",
      "Unlimited documents (5GB)",
      "Up to 10 beneficiaries",
      "SMS + WhatsApp check-in",
      "AES-256 encryption",
      "Death certificate verification",
      "Priority support",
    ],
    cta: "Start Premium Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "₦15,000",
    period: "/month",
    description: "For families and businesses",
    features: [
      "Everything in Premium",
      "Multi-user accounts (5 seats)",
      "API access",
      "Custom trigger workflows",
      "Dedicated relationship manager",
      "SLA guarantee",
      "NDPR compliance reports",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const testimonials = [
  {
    name: "Funmilayo Adeyinka",
    role: "Entrepreneur, Abuja",
    text: "I lost my uncle's crypto because nobody knew his seed phrases. Vaulta ensures my family will never face that pain.",
    rating: 5,
  },
  {
    name: "Obinna Nwachukwu",
    role: "Tech Professional, Lagos",
    text: "Finally, a solution built for Nigerians. The WhatsApp check-in feature is brilliant — my parents actually use it.",
    rating: 5,
  },
  {
    name: "Amaka Eze",
    role: "Lawyer, Port Harcourt",
    text: "I recommend Vaulta to all my estate planning clients. The legal document vault is exactly what was missing in Nigeria.",
    rating: 5,
  },
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#0B0F1A] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#0B0F1A]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <VaultaLogo size="md" />
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Security", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm rounded-lg bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Security"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/60 via-[#0B0F1A]/80 to-[#0B0F1A]" />
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4A853]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/8 mb-6">
              <Globe size={13} className="text-[#D4A853]" />
              <span className="text-xs text-[#D4A853]" style={{ fontWeight: 500 }}>
                Built for Nigeria · NDPR Compliant
              </span>
            </div>

            <h1
              className="mb-6 text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Your Digital Legacy,{" "}
              <span className="text-[#D4A853]">Secured Forever</span>
            </h1>

            <p
              className="text-white/60 mb-10 mx-auto"
              style={{ fontSize: "1.125rem", lineHeight: 1.75, maxWidth: "560px" }}
            >
              Vaulta protects your digital accounts, crypto wallets, and legal documents — then
              releases them to the right people at the right time. Your family deserves to inherit
              everything you've built.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-all"
                style={{ fontWeight: 700, fontSize: "1rem" }}
              >
                Secure My Legacy
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/app")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/15 text-white/80 hover:border-white/30 hover:text-white transition-all"
                style={{ fontSize: "1rem" }}
              >
                View Demo
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
              {[
                { label: "AES-256 Encrypted" },
                { label: "Zero-Knowledge" },
                { label: "NDPR Compliant" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-sm text-white/50">
                  <CheckCircle size={14} className="text-emerald-400" />
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "10,000+", label: "Vaults Created" },
              { value: "₦2.4B+", label: "Assets Protected" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "4.9★", label: "User Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-white/4 border border-white/8"
              >
                <p className="text-[#D4A853]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs text-[#D4A853] uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>
            Core Features
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 600,
            }}
          >
            Everything You Need to Protect Your Legacy
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-[#141929] border border-white/6 hover:border-[#D4A853]/20 transition-all hover:bg-[#1A2035] group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center mb-4 group-hover:bg-[#D4A853]/15 transition-colors">
                <f.icon size={20} className="text-[#D4A853]" />
              </div>
              <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>
                {f.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="security" className="py-20 bg-[#0D1220]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs text-[#D4A853] uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>
                How It Works
              </p>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 600,
                }}
              >
                Your Data is Safe.{" "}
                <span className="text-[#D4A853]">Your Legacy is Ready.</span>
              </h2>
              <div className="space-y-5">
                {[
                  {
                    step: "01",
                    title: "Store Securely",
                    desc: "Add your digital accounts, crypto wallets, and documents. Everything is encrypted client-side with AES-256.",
                  },
                  {
                    step: "02",
                    title: "Assign Beneficiaries",
                    desc: "Choose who receives what. Assign roles: heirs, trusted contacts, or legal executors.",
                  },
                  {
                    step: "03",
                    title: "Set Triggers",
                    desc: "Configure inactivity periods and verification rules. Check in periodically to keep your vault active.",
                  },
                  {
                    step: "04",
                    title: "Automatic Release",
                    desc: "When a trigger event is confirmed by 2-of-3 trusted contacts, your assets are released securely.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 flex items-center justify-center">
                      <span className="text-xs text-[#D4A853]" style={{ fontWeight: 700 }}>
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white mb-1" style={{ fontWeight: 600 }}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/8">
                <img
                  src={FAMILY_IMAGE}
                  alt="Family Legacy"
                  className="w-full h-80 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/60 to-transparent rounded-2xl" />
              </div>
              <div className="absolute -bottom-4 -right-4 p-4 rounded-xl bg-[#D4A853] text-[#0B0F1A] shadow-xl">
                <p className="text-xs" style={{ fontWeight: 600 }}>Vault Status</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
                  <span className="text-sm" style={{ fontWeight: 700 }}>Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs text-[#D4A853] uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>
            Pricing
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 600,
            }}
          >
            Transparent Pricing. No Surprises.
          </h2>
          <p className="text-white/50 mt-3">Cancel anytime. Priced for Nigerian families.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border flex flex-col ${
                plan.highlighted
                  ? "bg-[#D4A853]/8 border-[#D4A853]/40 shadow-xl shadow-[#D4A853]/5"
                  : "bg-[#141929] border-white/6"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4A853] text-[#0B0F1A] text-xs" style={{ fontWeight: 700 }}>
                  Most Popular
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-white/50">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span
                  className={plan.highlighted ? "text-[#D4A853]" : "text-white"}
                  style={{ fontSize: "2rem", fontWeight: 700 }}
                >
                  {plan.price}
                </span>
                <span className="text-sm text-white/40">{plan.period}</span>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                    <CheckCircle size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/signup")}
                className={`w-full py-3 rounded-xl text-sm transition-all ${
                  plan.highlighted
                    ? "bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A]"
                    : "bg-white/8 text-white border border-white/12 hover:bg-white/12"
                }`}
                style={{ fontWeight: 600 }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0D1220]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
              }}
            >
              Trusted Across Nigeria
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-[#141929] border border-white/6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-[#D4A853] fill-[#D4A853]" />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                    {t.name}
                  </p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-[#D4A853]/15 to-[#D4A853]/5 border border-[#D4A853]/20">
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 600,
            }}
          >
            Start Protecting Your Legacy Today
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Join thousands of Nigerians who are ensuring their families inherit everything they've built.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-all"
            style={{ fontWeight: 700, fontSize: "1.0625rem" }}
          >
            Create Your Free Vault →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <VaultaLogo size="sm" />
          <p className="text-sm text-white/30">
            © 2026 Vaulta Technologies Ltd. Lagos, Nigeria. NDPR Compliant.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Security"].map((l) => (
              <a key={l} href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
