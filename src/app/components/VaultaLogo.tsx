interface VaultaLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export function VaultaLogo({ size = "md", variant = "full" }: VaultaLogoProps) {
  const iconSizes = { sm: 28, md: 36, lg: 48 };
  const s = iconSizes[size];

  return (
    <div className="flex items-center gap-2.5">
      {/* Shield Icon */}
      <svg
        width={s}
        height={s}
        viewBox="0 0 40 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2L4 8V20C4 30.5 11 40.1 20 42C29 40.1 36 30.5 36 20V8L20 2Z"
          fill="url(#vaultaGrad)"
        />
        <path
          d="M20 2L4 8V20C4 30.5 11 40.1 20 42C29 40.1 36 30.5 36 20V8L20 2Z"
          stroke="url(#vaultaGrad2)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Lock body */}
        <rect x="13" y="20" width="14" height="11" rx="2" fill="white" fillOpacity="0.9" />
        {/* Lock shackle */}
        <path
          d="M15.5 20V17C15.5 14.5 17 13 20 13C23 13 24.5 14.5 24.5 17V20"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          fillOpacity="0.9"
        />
        {/* Keyhole */}
        <circle cx="20" cy="25" r="1.5" fill="#D4A853" />
        <rect x="19.25" y="25" width="1.5" height="3" rx="0.75" fill="#D4A853" />
        <defs>
          <linearGradient id="vaultaGrad" x1="4" y1="2" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#B8843A" />
          </linearGradient>
          <linearGradient id="vaultaGrad2" x1="4" y1="2" x2="36" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8C070" />
            <stop offset="1" stopColor="#D4A853" />
          </linearGradient>
        </defs>
      </svg>
      {variant === "full" && (
        <span
          className="text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontSize: size === "sm" ? "18px" : size === "md" ? "22px" : "28px",
            letterSpacing: "0.02em",
          }}
        >
          Vaulta
        </span>
      )}
    </div>
  );
}
