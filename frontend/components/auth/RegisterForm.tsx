"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { GoogleButton } from "./GoogleButton";
import { OrDivider } from "./OrDivider";
import { RecaptchaSlot } from "./RecaptchaSlot";
import {
  validateEmail,
  validateName,
  validatePassword,
  passwordStrength,
} from "./validation";

// TODO: replace both stubs with real calls to the Jejau auth API
// (and Google OAuth flow) once the backend is ready.
function handleRegister(data: { name: string; email: string; password: string }) {
  void data;
  return Promise.resolve();
}

function handleGoogleSignup() {
  // TODO: kick off the Google OAuth flow here.
}

type Errors = Partial<
  Record<"name" | "email" | "password" | "confirm" | "terms", string>
>;

const strengthLabels = ["Too short", "Okay", "Good", "Strong"];
const strengthColors = [
  "bg-amber/70",
  "bg-amber",
  "bg-forest-bright",
  "bg-mint",
];

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const validateConfirm = (value: string) =>
    value !== password ? "Passwords don't match." : undefined;

  function blur(field: keyof Errors, error: string | undefined) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: error }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: validateConfirm(confirm),
      terms: terms ? undefined : "You'll need to accept the terms to continue.",
    };
    setErrors(next);
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (Object.values(next).some(Boolean)) return;
    await handleRegister({ name, email, password });
    setDone(true);
  }

  if (done) {
    return (
      <div className="glass rounded-3xl p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-bright/15">
          <Sprout className="h-7 w-7 text-mint" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold">
          Welcome to Jejau, {name.split(" ")[0]}.
        </h2>
        <p className="mt-3 text-ivory/65">
          Your account is ready to sprout. Account creation will connect to the
          backend soon — for now, explore the site and meet the team.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  const strength = passwordStrength(password);

  return (
    <div className="glass rounded-3xl p-8 sm:p-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Plant your first record.
      </h2>
      <p className="mt-2 text-sm text-ivory/60">
        Free for your first three plants — no card required.
      </p>

      <div className="mt-8">
        <GoogleButton label="Continue with Google" onClick={handleGoogleSignup} />
      </div>

      <div className="my-7">
        <OrDivider />
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field
          id="register-name"
          name="name"
          label="Full name"
          autoComplete="name"
          value={name}
          onChange={setName}
          onBlur={() => blur("name", validateName(name))}
          error={touched.name ? errors.name : undefined}
          success={touched.name && !errors.name && !!name.trim()}
        />
        <Field
          id="register-email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={setEmail}
          onBlur={() => blur("email", validateEmail(email))}
          error={touched.email ? errors.email : undefined}
          success={touched.email && !errors.email && !!email}
        />
        <div>
          <Field
            id="register-password"
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={setPassword}
            onBlur={() => blur("password", validatePassword(password))}
            error={touched.password ? errors.password : undefined}
          />
          {password && (
            <div className="mt-2.5 flex items-center gap-2" aria-hidden="true">
              <div className="flex flex-1 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      strength > i ? strengthColors[strength] : "bg-ivory/10"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-ivory/50">
                {strengthLabels[strength]}
              </span>
            </div>
          )}
        </div>
        <Field
          id="register-confirm"
          name="confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={setConfirm}
          onBlur={() => blur("confirm", validateConfirm(confirm))}
          error={touched.confirm ? errors.confirm : undefined}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-ivory/70">
            <input
              type="checkbox"
              name="terms"
              required
              checked={terms}
              onChange={(e) => {
                setTerms(e.target.checked);
                setErrors((prev) => ({ ...prev, terms: undefined }));
              }}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-forest-bright"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-mint underline-offset-4 hover:underline"
              >
                Terms
              </Link>{" "}
              &{" "}
              <Link
                href="/privacy"
                className="font-medium text-mint underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <p role="alert" className="mt-2 text-xs text-amber-soft">
              {errors.terms}
            </p>
          )}
        </div>

        <RecaptchaSlot />

        <Button type="submit" size="lg" className="w-full">
          Create account
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-ivory/55">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-mint underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
