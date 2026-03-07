import { useState, useRef } from "react";
import { FileText, Plus, Upload, Trash2, Lock, X, FileCheck, Eye } from "lucide-react";
import { useApp } from "../providers/AppProvider";
import type { Document } from "../../types";

const typeColors: Record<string, string> = {
  will: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  deed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  insurance: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  bank: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  identity: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  other: "bg-white/5 text-white/40 border-white/10",
};

const typeLabels: Record<string, string> = {
  will: "Last Will",
  deed: "Property Deed",
  insurance: "Insurance",
  bank: "Bank Record",
  identity: "Identity",
  other: "Other",
};

const typeIcons: Record<string, string> = {
  will: "📜",
  deed: "🏠",
  insurance: "🛡️",
  bank: "🏦",
  identity: "🪪",
  other: "📄",
};

function DocumentCard({ doc, onDelete }: { doc: Document; onDelete: (id: string) => void }) {
  return (
    <div className="bg-[#141929] border border-white/6 rounded-xl p-4 hover:border-white/12 transition-all group">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-xl flex-shrink-0">
          {typeIcons[doc.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                {doc.name}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border mt-0.5 inline-block ${typeColors[doc.type]}`}>
                {typeLabels[doc.type]}
              </span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/8 transition-colors">
                <Eye size={13} />
              </button>
              <button
                onClick={() => onDelete(doc.id)}
                className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/8 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          <p className="text-xs text-white/50 leading-relaxed mb-3">{doc.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30 flex items-center gap-1">
                <FileCheck size={11} />
                {doc.fileType} · {doc.fileSize}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={11} className="text-emerald-400" />
              <span className="text-xs text-white/30">Encrypted</span>
            </div>
          </div>
          <p className="text-xs text-white/25 mt-1.5">Uploaded {doc.uploadedAt}</p>
        </div>
      </div>
    </div>
  );
}

function UploadModal({ onClose, onAdd }: { onClose: () => void; onAdd: (d: Document) => void }) {
  const [form, setForm] = useState({
    name: "",
    type: "other" as Document["type"],
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    if (!form.name) setForm((p) => ({ ...p, name: f.name.replace(/\.[^.]+$/, "") }));
  };

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `doc_${Date.now()}`,
      name: form.name,
      type: form.type,
      description: form.description,
      fileSize: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "—",
      fileType: file ? file.name.split(".").pop()?.toUpperCase() || "FILE" : "FILE",
      uploadedAt: new Date().toISOString().split("T")[0],
      encrypted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141929] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white" style={{ fontWeight: 600 }}>Upload Document</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5">
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handle} className="space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragging
                ? "border-[#D4A853]/60 bg-[#D4A853]/5"
                : file
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-white/10 hover:border-white/20 hover:bg-white/2"
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {file ? (
              <>
                <FileCheck size={24} className="text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-emerald-300" style={{ fontWeight: 500 }}>{file.name}</p>
                <p className="text-xs text-white/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </>
            ) : (
              <>
                <Upload size={24} className="text-white/25 mx-auto mb-2" />
                <p className="text-sm text-white/50">Drop file here or click to browse</p>
                <p className="text-xs text-white/30 mt-1">PDF, DOC, JPG up to 50MB</p>
              </>
            )}
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-1">Document Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. My Will 2024"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-1">Document Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as Document["type"] }))}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 transition-all"
            >
              {Object.entries(typeLabels).map(([k, v]) => (
                <option key={k} value={k} className="bg-[#141929]">{v}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-1">Description for beneficiaries</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Explain what this document is and any important instructions..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#D4A853]/50 transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
            <Lock size={13} className="text-emerald-400" />
            <p className="text-xs text-emerald-300/70">File will be encrypted before upload</p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function VaultDocuments() {
  const { documents, addDocument, deleteDocument } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<Document["type"] | "all">("all");

  const filtered = filter === "all" ? documents : documents.filter((d) => d.type === filter);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {showModal && <UploadModal onClose={() => setShowModal(false)} onAdd={addDocument} />}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <FileText size={20} className="text-purple-400" />
            <h1 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.375rem" }}>
              Legal Documents
            </h1>
          </div>
          <p className="text-sm text-white/50">
            {documents.length} document{documents.length !== 1 ? "s" : ""} · All encrypted
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors flex-shrink-0"
          style={{ fontWeight: 600, fontSize: "0.875rem" }}
        >
          <Plus size={16} />
          Upload
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(["all", ...Object.keys(typeLabels)] as (Document["type"] | "all")[]).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              filter === t
                ? "bg-[#D4A853]/15 text-[#D4A853] border border-[#D4A853]/25"
                : "bg-white/5 text-white/40 border border-white/8 hover:bg-white/8 hover:text-white/60"
            }`}
            style={{ fontWeight: filter === t ? 600 : 400 }}
          >
            {t === "all" ? "All" : typeLabels[t]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#141929] border border-white/6 rounded-2xl">
          <FileText size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/50 mb-1" style={{ fontWeight: 500 }}>No documents found</p>
          <p className="text-sm text-white/30 mb-4">Upload your will, deeds, and insurance policies</p>
          <button onClick={() => setShowModal(true)} className="px-5 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] text-sm hover:bg-[#E8BC6A]" style={{ fontWeight: 600 }}>
            <Upload size={14} className="inline mr-1.5" />
            Upload Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onDelete={deleteDocument} />
          ))}
        </div>
      )}
    </div>
  );
}
