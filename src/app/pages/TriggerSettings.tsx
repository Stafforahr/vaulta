import { useState } from "react";
import {
  Zap,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Save,
  Activity,
} from "lucide-react";
import { useApp } from "../providers/AppProvider";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
        checked ? "bg-[#D4A853]" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  description,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  description?: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/3 border border-white/6">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm text-white" style={{ fontWeight: 500 }}>
          {label}
        </label>
        <span className="text-sm text-[#D4A853]" style={{ fontWeight: 700 }}>
          {value} {unit}
        </span>
      </div>
      {description && (
        <p className="text-xs text-white/40 mb-3">{description}</p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #D4A853 0%, #D4A853 ${
            ((value - min) / (max - min)) * 100
          }%, rgba(255,255,255,0.1) ${
            ((value - min) / (max - min)) * 100
          }%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-white/25">{min} {unit}</span>
        <span className="text-xs text-white/25">{max} {unit}</span>
      </div>
    </div>
  );
}

const triggerSteps = [
  {
    step: 1,
    title: "Inactivity Detected",
    desc: "No check-in within the configured inactivity period",
    icon: Clock,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    step: 2,
    title: "Alert Sent to Trusted Contacts",
    desc: "All trusted contacts receive a verification request",
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    step: 3,
    title: "2-of-3 Confirmation",
    desc: "At least 2 trusted contacts confirm the trigger event",
    icon: Shield,
    color: "text-[#D4A853]",
    bg: "bg-[#D4A853]/10",
  },
  {
    step: 4,
    title: "Grace Period",
    desc: "A grace period begins — you can still cancel if alive",
    icon: Activity,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    step: 5,
    title: "Assets Released",
    desc: "Vault contents are released to assigned beneficiaries",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export function TriggerSettings() {
  const { triggerConfig, setTriggerConfig } = useApp();
  const [localConfig, setLocalConfig] = useState({ ...triggerConfig });
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof typeof localConfig>(key: K, value: typeof localConfig[K]) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setTriggerConfig(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Zap size={20} className="text-purple-400" />
            <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.375rem" }}>
              Trigger Settings
            </h1>
          </div>
          <p className="text-sm text-white/50">
            Configure when and how your vault is released to beneficiaries
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all flex-shrink-0 ${
            saved
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
              : "bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A]"
          }`}
          style={{ fontWeight: 600 }}
        >
          {saved ? (
            <>
              <CheckCircle size={15} />
              Saved
            </>
          ) : (
            <>
              <Save size={15} />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Warning */}
      <div className="mb-6 p-4 rounded-xl bg-amber-500/6 border border-amber-500/12 flex items-start gap-3">
        <AlertTriangle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-300/80 leading-relaxed">
          These settings determine when your vault contents are released. Review them carefully. Changes take effect immediately.
        </p>
      </div>

      <div className="space-y-5">
        {/* Inactivity & Check-in */}
        <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-blue-400" />
            <h2 className="text-white" style={{ fontWeight: 600 }}>Inactivity & Check-in</h2>
          </div>
          <div className="space-y-4">
            <SliderInput
              label="Inactivity Period"
              value={localConfig.inactivityPeriod}
              min={30}
              max={365}
              step={15}
              unit="days"
              onChange={(v) => update("inactivityPeriod", v)}
              description="How long you can be inactive before the trigger process begins"
            />
            <SliderInput
              label="Check-in Reminder Frequency"
              value={localConfig.checkInFrequency}
              min={7}
              max={90}
              step={7}
              unit="days"
              onChange={(v) => update("checkInFrequency", v)}
              description="How often you'll receive a check-in reminder (SMS + WhatsApp)"
            />
          </div>
        </div>

        {/* Verification Rule */}
        <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-[#D4A853]" />
            <h2 className="text-white" style={{ fontWeight: 600 }}>Death Verification Rule</h2>
          </div>
          <p className="text-sm text-white/40 mb-4">
            How many trusted contacts must confirm before assets are released
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {(["1of3", "2of3", "3of3"] as const).map((rule) => (
              <button
                key={rule}
                onClick={() => update("verificationRule", rule)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  localConfig.verificationRule === rule
                    ? "bg-[#D4A853]/12 border-[#D4A853]/35 text-[#D4A853]"
                    : "bg-white/3 border-white/8 text-white/50 hover:bg-white/6 hover:text-white"
                }`}
              >
                <p style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                  {rule.replace("of", "/").replace("3", "/3").split("/").slice(0, 2).join("/")}
                </p>
                <p className="text-xs mt-0.5">
                  {rule === "1of3" ? "1 of 3" : rule === "2of3" ? "2 of 3" : "3 of 3"}
                </p>
                {rule === "2of3" && (
                  <p className="text-xs text-[#D4A853] mt-1">Recommended</p>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-white/3">
            <Info size={13} className="text-white/30 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/40 leading-relaxed">
              <strong className="text-white/60">2-of-3 (Recommended):</strong> Balanced security. Even if one trusted contact is unavailable, the process can proceed. Prevents both false triggers and deadlocks.
            </p>
          </div>
        </div>

        {/* Grace Period */}
        <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-purple-400" />
            <h2 className="text-white" style={{ fontWeight: 600 }}>Grace Period</h2>
          </div>
          <SliderInput
            label="Grace Period Duration"
            value={localConfig.gracePeriod}
            min={3}
            max={30}
            step={1}
            unit="days"
            onChange={(v) => update("gracePeriod", v)}
            description="After trigger confirmation, this window allows you to cancel if still alive"
          />
        </div>

        {/* Advanced Options */}
        <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
          <h2 className="text-white mb-4" style={{ fontWeight: 600 }}>Advanced Options</h2>
          <div className="space-y-4">
            {[
              {
                key: "requireDeathCertificate" as const,
                label: "Require Death Certificate",
                desc: "Require official death certificate as additional verification",
                recommended: true,
              },
              {
                key: "notifyBeneficiaries" as const,
                label: "Notify Beneficiaries on Trigger",
                desc: "Send notification to all beneficiaries when trigger process begins",
                recommended: true,
              },
              {
                key: "trustedContactAlerts" as const,
                label: "Trusted Contact Inactivity Alerts",
                desc: "Alert trusted contacts when your check-in is overdue",
                recommended: false,
              },
              {
                key: "autoRelease" as const,
                label: "Auto-Release After Grace Period",
                desc: "Automatically release assets after grace period expires (no manual confirmation needed)",
                recommended: false,
              },
            ].map((option) => (
              <div
                key={option.key}
                className="flex items-start justify-between gap-4 py-3 border-b border-white/5 last:border-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm text-white" style={{ fontWeight: 500 }}>
                      {option.label}
                    </p>
                    {option.recommended && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{option.desc}</p>
                </div>
                <Toggle
                  checked={localConfig[option.key]}
                  onChange={(v) => update(option.key, v)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trigger Flow Diagram */}
        <div className="bg-[#141929] border border-white/6 rounded-2xl p-5">
          <h2 className="text-white mb-5" style={{ fontWeight: 600 }}>Trigger Flow</h2>
          <div className="space-y-1">
            {triggerSteps.map((step, i) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full ${step.bg} border border-white/8 flex items-center justify-center flex-shrink-0`}>
                    <step.icon size={14} className={step.color} />
                  </div>
                  {i < triggerSteps.length - 1 && (
                    <div className="w-px flex-1 bg-white/6 my-1" style={{ minHeight: "20px" }} />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm text-white" style={{ fontWeight: 500 }}>
                    {step.title}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save bar */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all ${
            saved
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
              : "bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A]"
          }`}
          style={{ fontWeight: 600 }}
        >
          {saved ? (
            <><CheckCircle size={15} /> Settings Saved</>
          ) : (
            <><Save size={15} /> Save Settings</>
          )}
        </button>
      </div>
    </div>
  );
}
