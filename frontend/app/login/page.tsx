import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to Jejau and pick up every plant's health record right where you left it.",
};

export default function LoginPage() {
  return (
    <AuthShell
      asideTitle={
        <>
          Your plants kept growing{" "}
          <span className="text-glow bg-gradient-to-r from-mint to-forest-bright bg-clip-text text-transparent">
            while you were away.
          </span>
        </>
      }
      asideText="Every record is exactly where you left it — timelines, treatments, and tomorrow's care schedule, ready when you are."
    >
      <LoginForm />
    </AuthShell>
  );
}
