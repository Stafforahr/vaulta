import { useNavigate } from "react-router";
import { VaultaLogo } from "../components/VaultaLogo";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center text-center px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="mb-8">
        <VaultaLogo size="lg" />
      </div>
      <p className="text-[#D4A853] text-xs uppercase tracking-widest mb-3" style={{ fontWeight: 600 }}>
        404
      </p>
      <h1
        className="text-white mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2rem",
          fontWeight: 600,
        }}
      >
        Page Not Found
      </h1>
      <p className="text-white/50 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white/70 hover:bg-white/5 transition-colors text-sm"
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4A853] text-[#0B0F1A] hover:bg-[#E8BC6A] transition-colors text-sm"
          style={{ fontWeight: 600 }}
        >
          <Home size={15} />
          Go Home
        </button>
      </div>
    </div>
  );
}
