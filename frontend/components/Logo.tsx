type LogoProps = {
  className?: string;
  /** Tailwind text color utility for the wordmark */
  wordmarkClassName?: string;
  withWordmark?: boolean;
};

/**
 * Jejau mark: a leaf whose midrib branches into circuit-like nodes —
 * nature fused with technology.
 */
export function Logo({
  className = "h-9 w-9",
  wordmarkClassName = "text-ivory",
  withWordmark = true,
}: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="12" fill="url(#jejau-bg)" />
        <path
          d="M20 31c-6.5-2.2-9.5-7.4-9-15.5C19 14.6 27.6 16 29 24c.8 4.6-3.4 7.6-9 7Z"
          fill="url(#jejau-leaf)"
        />
        <path
          d="M14.5 28.5c2.8-3.4 6.2-6 10.5-7.8"
          stroke="#0B1712"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="25" cy="20.7" r="1.7" fill="#E8B23A" />
        <circle cx="19.6" cy="24.4" r="1.3" fill="#0B1712" />
        <defs>
          <linearGradient
            id="jejau-bg"
            x1="0"
            y1="0"
            x2="40"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#14503C" />
            <stop offset="1" stopColor="#0B1712" />
          </linearGradient>
          <linearGradient
            id="jejau-leaf"
            x1="11"
            y1="15"
            x2="29"
            y2="31"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8FE3BC" />
            <stop offset="1" stopColor="#2FA678" />
          </linearGradient>
        </defs>
      </svg>
      {withWordmark && (
        <span
          className={`font-display text-xl font-bold tracking-tight ${wordmarkClassName}`}
        >
          Jejau
        </span>
      )}
    </span>
  );
}
