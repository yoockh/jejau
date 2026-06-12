import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Start your plants' health records for free — three plants, AI disease detection, and a care schedule that learns.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      asideTitle={
        <>
          Every great garden starts with{" "}
          <span className="text-glow bg-gradient-to-r from-mint to-forest-bright bg-clip-text text-transparent">
            one photo.
          </span>
        </>
      }
      asideText="Create your account and give your first plant something it's never had before: a memory. Diagnoses, treatments, and recoveries — all kept, all learning."
    >
      <RegisterForm />
    </AuthShell>
  );
}
