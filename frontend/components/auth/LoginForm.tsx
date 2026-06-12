"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import { GoogleButton } from "./GoogleButton";
import { OrDivider } from "./OrDivider";
import { RecaptchaSlot } from "./RecaptchaSlot";
import { validateEmail } from "./validation";

// TODO: replace both stubs with real calls to the Jejau auth API
// (and Google OAuth flow) once the backend is ready.
function handleLogin(data: { email: string; password: string }) {
  void data;
  return Promise.resolve();
}

function handleGoogleLogin() {
  // TODO: kick off the Google OAuth flow here.
}

type Errors = Partial<Record<"email" | "password", string>>;

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const validateLoginPassword = (value: string) =>
    value ? undefined : "Password is required.";

  function blur(field: keyof Errors, error: string | undefined) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: error }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {
      email: validateEmail(email),
      password: validateLoginPassword(password),
    };
    setErrors(next);
    setTouched({ email: true, password: true });
    if (Object.values(next).some(Boolean)) return;
    await handleLogin({ email, password });
    setDone(true);
  }

  if (done) {
    return (
      <div className="glass rounded-3xl p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-bright/15">
          <Leaf className="h-7 w-7 text-mint" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold">
          Welcome back.
        </h2>
        <p className="mt-3 text-ivory/65">
          Sign-in will connect to the backend soon — your plants&apos; records
          will be right here waiting.
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

  return (
    <div className="glass rounded-3xl p-8 sm:p-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Welcome back to the garden.
      </h2>
      <p className="mt-2 text-sm text-ivory/60">
        Your plants&apos; health records picked up right where you left them.
      </p>

      <div className="mt-8">
        <GoogleButton label="Continue with Google" onClick={handleGoogleLogin} />
      </div>

      <div className="my-7">
        <OrDivider />
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field
          id="login-email"
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
        <Field
          id="login-password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
          onBlur={() => blur("password", validateLoginPassword(password))}
          error={touched.password ? errors.password : undefined}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2.5 text-ivory/70">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 cursor-pointer rounded accent-forest-bright"
            />
            Remember me
          </label>
          <Link
            href="/contact"
            className="font-medium text-mint underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <RecaptchaSlot />

        <Button type="submit" size="lg" className="w-full">
          Log in
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-ivory/55">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-mint underline-offset-4 hover:underline"
        >
          Sign up free
        </Link>
      </p>
    </div>
  );
}
