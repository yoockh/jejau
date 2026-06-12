import { ShieldCheck } from "lucide-react";

/**
 * TODO: reCAPTCHA placeholder — swap this for the real
 * <ReCAPTCHA sitekey="..." /> widget once site keys are configured.
 */
export function RecaptchaSlot() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-mint/25 bg-charcoal-deep/40 px-4 py-3">
      <ShieldCheck
        className="h-4 w-4 shrink-0 text-forest-bright"
        aria-hidden="true"
      />
      <p className="text-xs leading-relaxed text-ivory/45">
        reCAPTCHA verification will appear here once site keys are configured.
      </p>
    </div>
  );
}
