"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import VerifyEmailForm from '@/components/main/auth/VerifyEmailForm';

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: ""
    }
  });

  const [step, setStep] = useState("form"); // "form" | "verify"
  const [registeredEmail, setRegisteredEmail] = useState("");

const onSubmit = async (data) => {
  try {
    const { data: res, error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.fullname,
    });

    if (error) {
      toast.error(error.message || "Failed to create account");
      return;
    }

    if (res) {
      const otpResult = await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "email-verification",
      });

      if (otpResult.error) {
        console.error("OTP send error:", otpResult.error);
      }

      setRegisteredEmail(data.email);
      setStep("verify");
    }
  } catch (err) {
    console.error("Signup error:", err);
    toast.error("Something went wrong. Please try again.");
  }
};
  return (
    <main className="min-h-screen w-full bg-brand-neutral grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:flex flex-col justify-between p-12 overflow-hidden border-r border-white/5 grayscale">
        <Image
          src="/images/signup.jpg"
          alt="Ferrum Atelier Space"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 max-w-sm mt-auto space-y-4">
          <span className="text-[9px] uppercase tracking-[0.3em] text-brand-primary/40 block">
            The Atelier
          </span>
          <h2 className="text-3xl font-normal tracking-wide text-brand-secondary font-serif leading-snug">
            A space defined by <br />silence and form.
          </h2>
          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-primary/30 block pt-4">
            © 2026 Ferrum Atelier
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-zinc-950/20">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="text-sm font-medium tracking-[0.25em] uppercase text-brand-secondary font-serif">
            Ferrum
          </Link>
        </div>

        <Card className="w-full max-w-md mx-auto bg-transparent ring-0 shadow-none rounded-none text-left py-12 space-y-8">
          {step === "form" ? (
            <>
              <CardHeader className="p-0 space-y-2">
                <CardTitle className="text-3xl font-normal tracking-wide text-brand-secondary font-serif">
                  Join the Atelier
                </CardTitle>
                <CardDescription className="text-[11px] tracking-wide text-brand-primary/50 leading-relaxed max-w-xs">
                  Create your architectural presence in the Ferrum ecosystem.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="p-0 space-y-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullname" className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/40 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullname"
                      type="text"
                      className="rounded-none bg-transparent border-0 border-b border-white/10 text-xs text-brand-secondary placeholder:text-brand-primary/20 focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-2 h-auto tracking-wider transition-colors"
                      placeholder="ALEXANDER VOGEL"
                      {...register("fullname", { required: "Name is required" })}
                    />
                    {errors.fullname && <p className="text-[10px] text-red-400 tracking-wide">{errors.fullname.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/40 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="rounded-none bg-transparent border-0 border-b border-white/10 text-xs text-brand-secondary placeholder:text-brand-primary/20 focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-2 h-auto tracking-wider transition-colors"
                      placeholder="ARCHITECT@FERRUM.COM"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-[10px] text-red-400 tracking-wide">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/40 font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      className="rounded-none bg-transparent border-0 border-b border-white/10 text-xs text-brand-secondary placeholder:text-brand-primary/20 focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-2 h-auto tracking-widest transition-colors"
                      placeholder="••••••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Minimum 8 characters required" }
                      })}
                    />
                    {errors.password && <p className="text-[10px] text-red-400 tracking-wide">{errors.password.message}</p>}
                  </div>
                </CardContent>

                <CardFooter className="p-0 pt-6 flex flex-col items-stretch space-y-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="secondary"
                    className="w-full rounded-none bg-brand-secondary text-brand-neutral font-medium text-[10px] uppercase tracking-[0.25em] py-6 hover:bg-brand-primary transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating Account..." : "Initialize Account"}
                  </Button>

                  <p className="w-full pt-4 text-center text-[10px] tracking-widest uppercase text-brand-primary/40">
                    Already part of the archive?{' '}
                    <Link href="/signin" className="text-brand-secondary font-medium hover:text-brand-primary transition-colors">
                      Sign In
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="p-0 space-y-2">
                <CardTitle className="text-3xl font-normal tracking-wide text-brand-secondary font-serif">
                  Verify Your Email
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <VerifyEmailForm email={registeredEmail} />
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}