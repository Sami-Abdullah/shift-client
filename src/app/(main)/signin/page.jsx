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

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Sign In Data:", data);
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
        
        <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] text-brand-secondary/60">
          Established MMXXIV
        </span>

        <div className="relative z-10 mt-auto max-w-lg">
          <h2 className="text-5xl lg:text-6xl font-normal tracking-tight text-brand-secondary uppercase leading-[0.95] font-serif">
            Structure <br />
            D <br />
            Elegance.
          </h2>
        </div>
      </div>

      {/* Right Column: Interactive Card Interface */}
      <div className="flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-zinc-950/20">
        <div className="hidden md:block" />

        {/* Shadcn Card base framing the form elements */}
        <Card className="w-full max-w-sm mx-auto bg-transparent ring-0 shadow-none rounded-none text-left space-y-10">
          <CardHeader className="p-0 space-y-2">
            <CardTitle className="text-3xl font-normal tracking-wide text-brand-secondary font-serif">
              Sign In
            </CardTitle>
            <CardDescription className="text-[11px] tracking-wide text-brand-primary/50 leading-relaxed">
              Access your curated collection and atelier archives.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/40 font-medium">
                  Email Address
                </Label>
                <Input 
                  id="email"
                  type="email" 
                  className="rounded-none bg-transparent border-0 border-b border-white/10 text-xs text-brand-secondary placeholder:text-brand-primary/20 focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-2 h-auto uppercase tracking-wider transition-colors"
                  placeholder="NAME@SHIFT.COM"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-[10px] text-red-400 tracking-wide">{errors.email.message}</p>}
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/40 font-medium">
                    Password
                  </Label>
                  <Link href="#" className="text-[9px] uppercase tracking-widest text-brand-primary/40 hover:text-brand-secondary transition-colors">
                    Forgot?
                  </Link>
                </div>
                <Input 
                  id="password"
                  type="password" 
                  className="rounded-none bg-transparent border-0 border-b border-white/10 text-xs text-brand-secondary placeholder:text-brand-primary/20 focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-2 h-auto tracking-widest transition-colors"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="text-[10px] text-red-400 tracking-wide">{errors.password.message}</p>}
              </div>

              <Button type="submit" variant="secondary" className="w-full rounded-none bg-brand-secondary text-brand-neutral font-medium text-[10px] uppercase tracking-[0.25em] py-6 hover:bg-brand-primary transition-colors cursor-pointer">
                Authentication
              </Button>
            </form>

            <div className="space-y-4 mt-8">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-white/5" />
                <span className="relative bg-brand-neutral px-3 text-[8px] uppercase tracking-[0.3em] text-brand-primary/30">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-none border-white/10 text-brand-secondary text-[9px] uppercase tracking-[0.2em] bg-transparent hover:bg-white/5 py-5 transition-colors cursor-pointer">
                  Identity
                </Button>
                <Button variant="outline" className="rounded-none border-white/10 text-brand-secondary text-[9px] uppercase tracking-[0.2em] bg-transparent hover:bg-white/5 py-5 transition-colors cursor-pointer">
                  Terminal
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-0 pt-2 block">
            <p className="text-[11px] text-brand-primary/40 tracking-wide text-center md:text-left">
              New to the atelier?{' '}
              <Link href="/signup" className="text-brand-secondary font-medium underline underline-offset-4 hover:text-brand-primary transition-colors">
                Request access
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Empty layout spacer for bottom alignment matching */}
        <div className="hidden md:block" />
      </div>
    </main>
  );
}
