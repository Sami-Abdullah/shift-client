"use client";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    if (authError) {
      setError(authError.message || "Something went wrong. Please try again.");
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2">
          <h1 className="text-display" style={{ fontSize: "28px" }}>Reset Password</h1>
          <p className="text-body text-brand-primary/60">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="border border-border bg-muted/20 p-6">
            <p className="text-body">
              If an account exists for <strong>{email}</strong>, you'll receive a reset link shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-label">Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none bg-transparent border-border text-brand-secondary h-11"
              />
            </div>

            {error && <p className="text-caption text-red-400">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-none bg-brand-secondary text-brand-neutral text-[10px] font-bold tracking-[0.18em] uppercase py-6 hover:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <Link href="/signin" className="block text-center text-label hover:text-brand-secondary transition-colors">
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}