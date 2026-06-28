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

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    console.log("Account Initialization Sequence:", data);
  };

  return (
    <main className="min-h-screen w-full bg-brand-neutral grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Visual Media Framing */}
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

      {/* Right Column: Interaction Shell */}
      <div className="flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-zinc-950/20">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="text-sm font-medium tracking-[0.25em] uppercase text-brand-secondary font-serif">
            Ferrum
          </Link>
        </div>

        {/* Structural Card Architecture */}
        <Card className="w-full max-w-md mx-auto bg-transparent ring-0 shadow-none rounded-none text-left py-12 space-y-8">
          <CardHeader className="p-0 space-y-2">
            <CardTitle className="text-3xl font-normal tracking-wide text-brand-secondary font-serif">
              Join the Atelier
            </CardTitle>
            <CardDescription className="text-[11px] tracking-wide text-brand-primary/50 leading-relaxed max-w-xs">
              Create your architectural presence in the Ferrum ecosystem.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Core User Metrics Input Field Area */}
            <CardContent className="p-0 space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="fullname" className="text-[9px] uppercase tracking-[0.25em] text-brand-primary/40 font-medium">
                  Full Name
                </Label>
                <Input 
                  id="fullname"
                  type="text" 
                  className="rounded-none bg-transparent border-0 border-b border-white/10 text-xs text-brand-secondary placeholder:text-brand-primary/20 focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-2 h-auto uppercase tracking-wider transition-colors"
                  placeholder="ALEXANDER VOGEL"
                  {...register("fullname", { required: "Name configuration required" })}
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
                  className="rounded-none bg-transparent border-0 border-b border-white/10 text-xs text-brand-secondary placeholder:text-brand-primary/20 focus-visible:ring-0 focus-visible:border-brand-secondary px-0 py-2 h-auto uppercase tracking-wider transition-colors"
                  placeholder="ARCHITECT@FERRUM.COM"
                  {...register("email", { required: "Email path destination required" })}
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
                    required: "Security signature code required",
                    minLength: { value: 8, message: "Minimum 8 character baseline parameter required" }
                  })}
                />
                {errors.password && <p className="text-[10px] text-red-400 tracking-wide">{errors.password.message}</p>}
              </div>
            </CardContent>

            {/* Interactive Card Action Array Area */}
            <CardFooter className="p-0 pt-6 flex flex-col items-stretch space-y-6">
              {/* Primary Sign Up Submission */}
              <Button type="submit" variant="secondary" className="w-full rounded-none bg-brand-secondary text-brand-neutral font-medium text-[10px] uppercase tracking-[0.25em] py-6 hover:bg-brand-primary transition-colors cursor-pointer">
                Initialize Account
              </Button>

              {/* Auxiliary Platform Actions */}
              <div className="space-y-4 w-full">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-full border-t border-white/5" />
                  <span className="relative bg-zinc-950 px-3 text-[8px] uppercase tracking-[0.3em] text-brand-primary/30">
                    Or
                  </span>
                </div>

                <Button type="button" variant="outline" className="w-full rounded-none border-white/10 text-brand-secondary text-[9px] uppercase tracking-[0.2em] bg-transparent hover:bg-white/5 py-6 transition-colors cursor-pointer">
                  Join with Google
                </Button>
              </div>

              {/* Direct Path Context Links */}
              <div className="w-full pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-widest uppercase">
                <p className="text-brand-primary/40">
                  Already part of the archive?{' '}
                  <Link href="/signin" className="text-brand-secondary font-medium hover:text-brand-primary transition-colors">
                    Sign In
                  </Link>
                </p>
                <span className="text-brand-primary/20 hidden sm:inline text-[8px] tracking-[0.3em]">
                  Precision & Form
                </span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}