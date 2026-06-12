/** Graceful CSS-only globe used while loading and when WebGL is unavailable. */
export function StaticGlobe() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
      aria-hidden="true"
    >
      <div className="orb-glow absolute -inset-16" />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #2FA678 0%, #1F6F54 32%, #0E3A2B 62%, #0B1712 100%)",
          boxShadow:
            "0 0 80px rgba(47,166,120,0.35), inset -24px -18px 60px rgba(11,23,18,0.8)",
        }}
      />
      {/* graticule lines */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full opacity-25"
      >
        {[20, 35, 50, 65, 80].map((cy) => (
          <ellipse
            key={cy}
            cx="50"
            cy={cy}
            rx={Math.sqrt(Math.max(0, 2500 - (cy - 50) ** 2)) * 0.98}
            ry={Math.sqrt(Math.max(0, 2500 - (cy - 50) ** 2)) * 0.18}
            fill="none"
            stroke="#8FE3BC"
            strokeWidth="0.35"
          />
        ))}
        {[15, 32.5, 50, 67.5, 85].map((rx) => (
          <ellipse
            key={rx}
            cx="50"
            cy="50"
            rx={Math.abs(50 - rx) < 1 ? 0.5 : Math.abs(rx - 50) * 1.4}
            ry="49"
            fill="none"
            stroke="#8FE3BC"
            strokeWidth="0.35"
          />
        ))}
      </svg>
    </div>
  );
}
