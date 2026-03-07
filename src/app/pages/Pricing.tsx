import { useNavigate } from "react-router";
import { CheckCircle, ArrowLeft, Zap, Crown, Building2 } from "lucide-react";
import { VaultaLogo } from "../components/VaultaLogo";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₦0",
    period: "/month",
    icon: Zap,
    iconColor: "text-white/60",
    description: "For individuals just getting started with digital legacy planning",
    color: "border-white/8",
    headerBg: "bg-white/3",
    features: [
      { text: "Up to 3 digital accounts", included: true },
      { text: "1 crypto wallet", included: true },
      { text: "3 documents (10MB total)", included: true },
      { text: "2 beneficiaries", included: true },
      { text: "Email check-in reminders", included: true },
      { text: "AES-256 encryption", included: true },
      { text: "SMS & WhatsApp check-in", included: false },
      { text: "Death certificate verification", included: false },
      { text: "Unlimited assets", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    ctaStyle: "border border-white/15 text-white hover:bg-white/5",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₦2,500",
    period: "/month",
    icon: Crown,
    iconColor: "text-[#D4A853]",
    description: "Complete peace of mind for individuals and small families",
    color: "border-[#D4A853]/35",
    headerBg: "bg-[#D4A853]/8",
    badge: "Most Popular",
    features: [
      { text: "Unlimited digital accounts", included: true },
      { text: "Unlimited crypto wallets", included: true },
      { text: "Unlimited documents (5GB)", included: true },
      { text: "Up to 10 beneficiaries", included: true },
      { text: "SMS + WhatsApp check-in", included: true },
      { text: "AES-256 encryption", included: true },
      { text: "Death certificate verification", included: true },
      { text: "2-of-3 trusted contact rule", included: true },
      { text: "Personal messages (text)", included: true },
      { text: "Priority support (24h SLA)", included: true },
    ],
    cta: "Start 7-Day Free Trial",
    ctaStyle: "bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A]",
    annualSave: "Save ₦6,000/year",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₦15,000",
    period: "/month",
    icon: Building2,
    iconColor: "text-blue-400",
    description: "For families, businesses and estate planning professionals",
    color: "border-blue-500/20",
    headerBg: "bg-blue-500/5",
    features: [
      { text: "Everything in Premium", included: true },
      { text: "5 user seats (family/team)", included: true },
      { text: "API access", included: true },
      { text: "Custom trigger workflows", included: true },
      { text: "Dedicated relationship manager", included: true },
      { text: "99.9% SLA guarantee", included: true },
      { text: "NDPR compliance reports", included: true },
      { text: "Legal executor portal", included: true },
      { text: "White-label option", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
    ctaStyle: "bg-blue-500/15 text-blue-300 border border-blue-500/25 hover:bg-blue-500/20",
  },
];

const faqs = [
  {
    q: "Is my data safe with Vaulta?",
    a: "Yes. All data is encrypted client-side using AES-256 before it's stored. Not even Vaulta can read your vault contents.",
  },
  {
    q: "What happens if a trusted contact is unavailable?",
    a: "With the 2-of-3 rule, only 2 of your 3 trusted contacts need to confirm. This prevents deadlocks while maintaining security.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can cancel your Premium or Enterprise subscription at any time. Your data remains accessible on the Free plan.",
  },
  {
    q: "Is Vaulta compliant with Nigerian law?",
    a: "Vaulta is designed with NDPR (Nigeria Data Protection Regulation) compliance in mind. We recommend consulting a lawyer for specific estate planning needs.",
  },
  {
    q: "What if I forget to check in?",
    a: "You'll receive reminders via email, SMS, and WhatsApp before the inactivity period expires. The trigger process only begins after the full period elapses.",
  },
];

export function Pricing() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#0B0F1A] text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#0B0F1A]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <VaultaLogo size="sm" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm rounded-lg bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A]"
              style={{ fontWeight: 600 }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs text-[#D4A853] uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>
            Pricing
          </p>
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            Transparent Pricing for{" "}
            <span className="text-[#D4A853]">Every Family</span>
          </h1>
          <p className="text-white/50 max-w-md mx-auto">
            Priced for Nigerians. Cancel anytime. All plans include AES-256 encryption.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border ${plan.color} overflow-hidden`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4A853] text-[#0B0F1A] text-xs z-10" style={{ fontWeight: 700 }}>
                    {plan.badge}
                  </div>
                )}

                <div className={`p-6 ${plan.headerBg}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <PlanIcon size={20} className={plan.iconColor} />
                    <h2 className="text-white" style={{ fontWeight: 700 }}>
                      {plan.name}
                    </h2>
                  </div>
                  <div className="mb-2">
                    <span style={{ fontSize: "2.25rem", fontWeight: 700 }} className="text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/40">{plan.period}</span>
                  </div>
                  {plan.annualSave && (
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                      {plan.annualSave} with annual billing
                    </span>
                  )}
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex-1 p-6 bg-[#141929]">
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle
                          size={15}
                          className={`flex-shrink-0 mt-0.5 ${
                            feature.included ? "text-emerald-400" : "text-white/15"
                          }`}
                        />
                        <span className={feature.included ? "text-white/70" : "text-white/25 line-through"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate(plan.id === "enterprise" ? "/signup" : "/signup")}
                    className={`w-full py-3 rounded-xl text-sm transition-all ${plan.ctaStyle}`}
                    style={{ fontWeight: 600 }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2
            className="text-center mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: 600,
            }}
          >
            Full Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left py-3 px-4 text-sm text-white/50">Feature</th>
                  {["Free", "Premium", "Enterprise"].map((p) => (
                    <th key={p} className="py-3 px-4 text-sm text-white text-center" style={{ fontWeight: 600 }}>
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Digital Accounts", values: ["3", "Unlimited", "Unlimited"] },
                  { feature: "Crypto Wallets", values: ["1", "Unlimited", "Unlimited"] },
                  { feature: "Storage", values: ["10MB", "5GB", "50GB"] },
                  { feature: "Beneficiaries", values: ["2", "10", "Unlimited"] },
                  { feature: "AES-256 Encryption", values: [true, true, true] },
                  { feature: "SMS Check-in", values: [false, true, true] },
                  { feature: "WhatsApp Check-in", values: [false, true, true] },
                  { feature: "Death Certificate Verification", values: [false, true, true] },
                  { feature: "API Access", values: [false, false, true] },
                  { feature: "User Seats", values: ["1", "1", "5"] },
                  { feature: "Support", values: ["Community", "Priority (24h)", "Dedicated"] },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="py-3 px-4 text-sm text-white/60">{row.feature}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="py-3 px-4 text-center">
                        {typeof val === "boolean" ? (
                          <div className="flex justify-center">
                            <CheckCircle
                              size={16}
                              className={val ? "text-emerald-400" : "text-white/15"}
                            />
                          </div>
                        ) : (
                          <span className="text-sm text-white/70">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-center mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: 600,
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#141929] border border-white/6 rounded-xl p-5">
                <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>
                  {faq.q}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-br from-[#D4A853]/12 to-transparent border border-[#D4A853]/15">
          <h2
            className="mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: 600,
            }}
          >
            Ready to Secure Your Legacy?
          </h2>
          <p className="text-white/50 mb-6">Start free. Upgrade when you need more.</p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-all"
            style={{ fontWeight: 700 }}
          >
            Create Free Vault →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-white/25">© 2026 Vaulta Technologies Ltd. Lagos, Nigeria.</p>
        </div>
      </footer>
    </div>
  );
}
