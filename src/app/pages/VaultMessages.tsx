import { useState } from "react";
import {
  MessageSquareHeart,
  Plus,
  Trash2,
  Lock,
  X,
  FileText,
  Clock,
} from "lucide-react";
import { useApp } from "../providers/AppProvider";
import type { PersonalMessage } from "../../types";

const conditionLabels: Record<string, string> = {
  death: "On Death",
  inactivity: "On Inactivity",
  specific_date: "On Specific Date",
};

const conditionColors: Record<string, string> = {
  death: "bg-red-500/10 text-red-400 border-red-500/20",
  inactivity: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  specific_date: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

function MessageCard({ msg, onDelete }: { msg: PersonalMessage; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#141929] border border-white/6 rounded-xl overflow-hidden hover:border-white/10 transition-all">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <MessageSquareHeart size={14} className="text-pink-400" />
            </div>
            <div>
              <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                {msg.title}
              </h3>
              <p className="text-xs text-white/40">To: {msg.recipient}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${conditionColors[msg.deliveryCondition]}`}>
              {conditionLabels[msg.deliveryCondition]}
            </span>
            <button
              onClick={() => onDelete(msg.id)}
              className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/8 transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        <div
          className={`text-sm text-white/60 leading-relaxed ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {msg.content}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Lock size={11} className="text-emerald-400" />
            <span className="text-xs text-white/30">Encrypted · {msg.type}</span>
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-[#D4A853] hover:text-[#E8BC6A] transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      </div>

      <div className="px-4 py-2.5 bg-white/2 border-t border-white/4 flex items-center gap-1.5">
        <Clock size={11} className="text-white/25" />
        <p className="text-xs text-white/30">Created {msg.createdAt}</p>
      </div>
    </div>
  );
}

function AddMessageModal({
  onClose,
  onAdd,
  beneficiaryNames,
}: {
  onClose: () => void;
  onAdd: (m: PersonalMessage) => void;
  beneficiaryNames: { id: string; name: string }[];
}) {
  const [form, setForm] = useState({
    title: "",
    recipientId: beneficiaryNames[0]?.id || "",
    content: "",
    type: "text" as PersonalMessage["type"],
    deliveryCondition: "death" as PersonalMessage["deliveryCondition"],
  });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = beneficiaryNames.find((b) => b.id === form.recipientId);
    onAdd({
      id: `msg_${Date.now()}`,
      title: form.title,
      recipient: recipient?.name || "Unknown",
      recipientId: form.recipientId,
      content: form.content,
      type: form.type,
      deliveryCondition: form.deliveryCondition,
      createdAt: new Date().toISOString().split("T")[0],
      encrypted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141929] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white" style={{ fontWeight: 600 }}>Write a Personal Message</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5">
            <X size={16} />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-pink-500/8 border border-pink-500/12">
          <p className="text-xs text-pink-300/80 leading-relaxed">
            ❤️ This message will only be delivered to your recipient when the trigger condition is met. Write freely — it's private and encrypted.
          </p>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs text-white/50 mb-1">Message Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. To My Beloved Family"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/50 mb-1">Recipient</label>
              <select
                value={form.recipientId}
                onChange={(e) => setForm((f) => ({ ...f, recipientId: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all"
              >
                {beneficiaryNames.map((b) => (
                  <option key={b.id} value={b.id} className="bg-[#141929]">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1">Deliver When</label>
              <select
                value={form.deliveryCondition}
                onChange={(e) => setForm((f) => ({ ...f, deliveryCondition: e.target.value as PersonalMessage["deliveryCondition"] }))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all"
              >
                <option value="death" className="bg-[#141929]">On Death</option>
                <option value="inactivity" className="bg-[#141929]">On Inactivity</option>
                <option value="specific_date" className="bg-[#141929]">On Specific Date</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-1">Your Message *</label>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="Write your heartfelt message here. This is private and will only be read by your recipient after the trigger..."
              rows={6}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all resize-none leading-relaxed"
            />
            <p className="text-xs text-white/30 mt-1 text-right">{form.content.length} characters</p>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <Lock size={13} className="text-emerald-400" />
            <p className="text-xs text-emerald-300/70">Message is end-to-end encrypted. Only your recipient can read it.</p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
              Save Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function VaultMessages() {
  const { messages, addMessage, deleteMessage, beneficiaries } = useApp();
  const [showModal, setShowModal] = useState(false);

  const beneficiaryNames = beneficiaries.map((b) => ({ id: b.id, name: b.name }));

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {showModal && (
        <AddMessageModal
          onClose={() => setShowModal(false)}
          onAdd={addMessage}
          beneficiaryNames={beneficiaryNames}
        />
      )}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <MessageSquareHeart size={20} className="text-pink-400" />
            <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.375rem" }}>
              Personal Messages
            </h1>
          </div>
          <p className="text-sm text-white/50">
            {messages.length} message{messages.length !== 1 ? "s" : ""} saved · Delivered on trigger
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors flex-shrink-0"
          style={{ fontWeight: 600, fontSize: "0.875rem" }}
        >
          <Plus size={16} />
          Write Message
        </button>
      </div>

      {/* Explainer */}
      <div className="mb-5 p-4 rounded-xl bg-pink-500/6 border border-pink-500/12">
        <div className="flex items-start gap-3">
          <MessageSquareHeart size={16} className="text-pink-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-pink-200" style={{ fontWeight: 500 }}>
              Heartfelt messages for the people you love
            </p>
            <p className="text-xs text-pink-300/60 mt-1 leading-relaxed">
              Write text messages for your beneficiaries. They are fully encrypted and only released when your configured trigger condition is met.
            </p>
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 bg-[#141929] border border-white/6 rounded-2xl">
          <MessageSquareHeart size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/50 mb-1" style={{ fontWeight: 500 }}>No messages yet</p>
          <p className="text-sm text-white/30 mb-4">Leave a final message for someone you love</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]"
            style={{ fontWeight: 600 }}
          >
            <FileText size={14} className="inline mr-1.5" />
            Write First Message
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {messages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} onDelete={deleteMessage} />
          ))}
        </div>
      )}
    </div>
  );
}
