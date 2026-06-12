const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_RE.test(value)) return "That doesn't look like a valid email.";
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  return undefined;
}

export function validateName(value: string): string | undefined {
  if (!value.trim()) return "Please tell us your name.";
  return undefined;
}

/** 0–3 rough strength score for the meter on the register page. */
export function passwordStrength(value: string): number {
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score++;
  return score;
}
