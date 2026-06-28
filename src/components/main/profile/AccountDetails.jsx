"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AccountDetails() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "Sami Abdullah",
      email: "sami@example.com",
      phone: "+880 1234-567890",
      city: "Dhaka",
    },
  });

  const onUpdate = (data) => console.log("Updating Archive:", data);

  return (
    <div className="space-y-8 flex-1 w-full text-left">
      <div className="border-b border-zinc-900 pb-4">
        <h3 className="text-sm font-serif font-normal tracking-widest text-zinc-200 uppercase">
          Account Registry
        </h3>
      </div>

      <form onSubmit={handleSubmit(onUpdate)} className="space-y-6 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Full Name</Label>
            <Input {...register("name")} className="rounded-none bg-transparent border-0 border-b border-zinc-800 text-xs text-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-400 px-0 py-2 h-auto uppercase tracking-wider" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Email Address</Label>
            <Input type="email" {...register("email")} className="rounded-none bg-transparent border-0 border-b border-zinc-800 text-xs text-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-400 px-0 py-2 h-auto uppercase tracking-wider" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Contact Context</Label>
            <Input {...register("phone")} className="rounded-none bg-transparent border-0 border-b border-zinc-800 text-xs text-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-400 px-0 py-2 h-auto tracking-wider" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-medium">Region Hub</Label>
            <Input {...register("city")} className="rounded-none bg-transparent border-0 border-b border-zinc-800 text-xs text-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-400 px-0 py-2 h-auto uppercase tracking-wider" />
          </div>
        </div>

        <Button type="submit" className="rounded-none bg-zinc-100 text-zinc-950 font-medium text-[10px] uppercase tracking-[0.25em] py-5 px-8 hover:bg-white transition-colors cursor-pointer pt-3">
          Commit Changes
        </Button>
      </form>
    </div>
  );
}