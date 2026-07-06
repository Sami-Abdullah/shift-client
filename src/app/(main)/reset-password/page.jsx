import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-brand-neutral" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}