"use client";
import { Controller } from "react-hook-form";
import { Eye } from "lucide-react";

export default function ProductVisibility({ control }) {
  return (
    <div className="border border-border bg-muted p-6">
      <Controller
        name="visible"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 border border-border bg-background flex items-center justify-center">
                <Eye size={14} strokeWidth={1.5} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-foreground mb-0.5">
                  Product Visibility
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {field.value
                    ? "Visible on the storefront."
                    : "Draft — hidden from the storefront."}
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={`relative w-11 h-6 transition-colors duration-300 ${
                field.value ? "bg-foreground" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-background transition-all duration-300 ${
                  field.value ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        )}
      />
    </div>
  );
}