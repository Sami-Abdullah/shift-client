"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions/customer/profile";

export default function AccountDetails({ user }) {
  const { register, handleSubmit, formState: { isSubmitting, isDirty } } = useForm({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const onUpdate = async (data) => {
    try {
      await updateProfile(data);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const fieldClass =
    "rounded-none bg-transparent border border-border text-data focus-visible:ring-0 focus-visible:border-brand-primary/40 h-10 px-3";

  return (
    <div className="border border-border bg-muted/20 p-8">
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-border">
        <div>
          <p className="text-eyebrow mb-1">Personal Details</p>
          <h2 className="text-heading" style={{ fontSize: "16px" }}>Account Information</h2>
        </div>
        {isDirty && <span className="text-label text-amber-400/80">Unsaved changes</span>}
      </div>

      <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-label">Full Name</Label>
            <Input {...register("name")} className={fieldClass} />
          </div>

          <div className="space-y-2">
            <Label className="text-label">Email Address</Label>
            <Input value={user?.email || ""} disabled className={`${fieldClass} opacity-40 cursor-not-allowed`} />
          </div>

          <div className="space-y-2">
            <Label className="text-label">Phone</Label>
            <Input {...register("phone")} placeholder="Not set" className={fieldClass} />
          </div>

          <div className="space-y-2">
            <Label className="text-label">Address</Label>
            <Input {...register("address")} placeholder="Not set" className={fieldClass} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border">
          <p className="text-caption">Email address cannot be changed here</p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-none bg-brand-secondary text-brand-neutral text-[9px] font-bold tracking-[0.18em] uppercase px-6 py-2.5 h-auto hover:bg-white transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}