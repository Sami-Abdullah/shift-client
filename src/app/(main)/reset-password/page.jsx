"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    const { error: authError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "This reset link is invalid or has expired.");
    } else {
      router.push("/signin");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary flex items-center justify-center px-6">
        <p className="text-body text-red-400">Invalid or missing reset link.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <h1 className="text-display" style={{ fontSize: "28px" }}>New Password</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-label">New Password</Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-none bg-transparent border-border text-brand-secondary h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-label">Confirm Password</Label>
            <Input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-none bg-transparent border-border text-brand-secondary h-11"
            />
          </div>

          {error && <p className="text-caption text-red-400">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-none bg-brand-secondary text-brand-neutral text-[10px] font-bold tracking-[0.18em] uppercase py-6 hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}