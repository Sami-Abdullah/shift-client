"use client";

import React from 'react';
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
import { useRouter } from 'next/navigation';

export default function SignInPage() {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    const { data: res, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (res) {
      toast('you signed in');

      if (res.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }

      router.refresh();
    } else {
      toast.error(`${error}`);
    }
  };

  return (
    <main className="min-h-screen w-full bg-brand-neutral grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Visual Media & Brand Philosophy Frame */}
      <div className="relative hidden md:flex flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <Image
          src="/images/signin.png"
          alt="Shift Editorial Silhouette"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />

        <span className="relative z-10 text-[10px] tracking-[0.3em] text-brand-secondary/60">
          Established MMXXIV
        </span>

        <div className="relative z-10 mt-auto max-w-lg">
          <h2 className="text-5xl lg:text-6xl font-normal tracking-tight text-brand-secondary leading-[0.95] font-serif">
            Structure & Elegance.
          </h2>
        </div>
      </div>

      {/* Right Column: Interactive Card Interface */}
      <div className="flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-zinc-950/20">
        <div className="hidden md:block" />

        <Card className="w-full max-w-sm mx-auto bg-transparent ring-0 shadow-none rounded-none text-left space-y-10">
          <CardHeader className="p-0 space-y-2">
            <CardTitle className="text-3xl font-normal tracking-wide text-brand-secondary font-serif">
              Sign In
            </CardTitle>
            <CardDescription className="text-[11px] tracking-wide text-brand-primary/50 leading-relaxed">
              Access your curated collection and atelier archives.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="p-0 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] tracking-[0.15em] uppercase text-brand-secondary/70">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="rounded-none bg-transparent border-white/10 text-brand-secondary h-11"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[10px] tracking-[0.15em] uppercase text-brand-secondary/70">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-[10px] text-brand-secondary/50 hover:text-brand-secondary transition-colors">
                    Forgot Password
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="rounded-none bg-transparent border-white/10 text-brand-secondary h-11"
                />
                {errors.password && (
                  <p className="text-[10px] text-red-400">{errors.password.message}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-0 flex flex-col gap-6 mt-8">
              <Button
                type="submit"
                className="w-full rounded-none h-11 bg-brand-secondary text-brand-neutral hover:bg-white text-[11px] font-bold tracking-[0.18em] uppercase"
              >
                Sign In
              </Button>
              <p className="text-[11px] text-brand-secondary/50 text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-brand-secondary hover:underline">
                  Create one
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}