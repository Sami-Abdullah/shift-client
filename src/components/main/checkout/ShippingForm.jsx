"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ShippingForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fieldClass =
    "rounded-none bg-transparent border-border text-brand-secondary h-11 text-xs focus-visible:ring-0 focus-visible:border-brand-primary/40";
  const labelClass = "text-[10px] tracking-[0.15em] uppercase text-brand-primary/60";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-brand-primary/50 font-medium pb-3 border-b border-border">
        Shipping Address
      </h2>

      <div className="space-y-2">
        <Label htmlFor="fullName" className={labelClass}>Full Name</Label>
        <Input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className={fieldClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className={labelClass}>Address</Label>
        <Input id="address" name="address" required value={form.address} onChange={handleChange} className={fieldClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className={labelClass}>City</Label>
          <Input id="city" name="city" required value={form.city} onChange={handleChange} className={fieldClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal" className={labelClass}>Postal Code</Label>
          <Input id="postal" name="postal" required value={form.postal} onChange={handleChange} className={fieldClass} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className={labelClass}>Country</Label>
        <Input id="country" name="country" required value={form.country} onChange={handleChange} className={fieldClass} />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-none bg-brand-secondary text-brand-neutral font-medium text-[10px] uppercase tracking-[0.25em] py-6 hover:bg-white transition-colors mt-2"
      >
        {loading ? "Preparing Payment..." : "Continue to Payment"}
      </Button>
    </form>
  );
}