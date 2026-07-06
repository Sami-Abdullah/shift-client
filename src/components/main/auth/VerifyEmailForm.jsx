"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailForm({ email }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Invalid or expired code. Please try again.");
    } else {
      toast.success("Email verified — welcome to Ferrum");
      router.push("/");
      router.refresh();
    }
  };

  const handleResend = async () => {
    setResending(true);
    const { error: authError } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });
    setResending(false);

    if (authError) {
      toast.error(authError.message || "Failed to resend code");
    } else {
      toast.success("A new code has been sent");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-body text-brand-primary/60">
        We&apos;ve sent a 6-digit code to <strong className="text-brand-secondary">{email}</strong>. Enter it below to verify your account. The code expires in 10 minutes.
      </p>

      <form onSubmit={handleVerify} className="space-y-5">
        <Input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          inputMode="numeric"
          maxLength={6}
          className="rounded-none bg-transparent border-0 border-b border-white/10 text-2xl tracking-[0.5em] text-center text-brand-secondary focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-3 h-auto"
        />

        {error && <p className="text-caption text-red-400">{error}</p>}

        <Button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full rounded-none bg-brand-secondary text-brand-neutral text-[10px] font-bold tracking-[0.25em] uppercase py-6 hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </Button>
      </form>

      <button
        onClick={handleResend}
        disabled={resending}
        className="text-label hover:text-brand-secondary transition-colors cursor-pointer disabled:opacity-50"
      >
        {resending ? "Sending..." : "Resend code"}
      </button>
    </div>
  );
}