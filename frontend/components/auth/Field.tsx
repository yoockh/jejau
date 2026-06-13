"use client";

import { useState } from "react";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  success?: boolean;
};

/**
 * Floating-label input for the auth pages: dark glass styling with
 * inline error/success states. The label floats via the
 * `:placeholder-shown` trick, so it needs no JS.
 */
export function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  value,
  onChange,
  onBlur,
  error,
  success,
}: FieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  const borderClasses = error
    ? "border-amber/70 focus:border-amber"
    : success
      ? "border-forest-bright/60 focus:border-forest-bright"
      : "border-mint/20 focus:border-mint/60";

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={resolvedType}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`peer w-full rounded-xl border bg-charcoal-deep/60 px-4 pb-2.5 pt-6 text-ivory transition-all duration-300 placeholder:text-transparent focus:shadow-[0_0_0_1px_rgba(143,227,188,0.22),0_0_26px_rgba(47,166,120,0.16)] focus:outline-none ${borderClasses} ${
            isPassword ? "pr-12" : success ? "pr-11" : ""
          }`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-mint/80 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ivory/45 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-mint/80"
        >
          {label}
        </label>

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ivory/45 transition-colors hover:text-mint"
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" aria-hidden="true" />
            ) : (
              <Eye className="h-4.5 w-4.5" aria-hidden="true" />
            )}
          </button>
        ) : (
          success && (
            <Check
              className="absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-forest-bright"
              aria-hidden="true"
            />
          )
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs text-amber-soft"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
