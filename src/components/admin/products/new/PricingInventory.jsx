import { PackageOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function PricingInventory({
  register, errors, setValue, sizes, totalQty,
}) {
  return (
    <div className="border border-border bg-muted p-6">

      {/* Section label */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        <PackageOpen size={13} strokeWidth={1.5} className="text-muted-foreground" />
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          Pricing & Inventory
        </p>
      </div>

      {/* Price + Total Qty */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
            Price (USD) <span className="text-[#f87171]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground font-medium">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={`rounded-none bg-background border-border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 h-10 text-[13px] pl-7 transition-colors ${
                errors.price ? "border-[#f87171]" : "focus-visible:border-foreground/30"
              }`}
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
                validate: (v) => !isNaN(v) || "Price must be a valid number",
              })}
            />
          </div>
          {errors.price && (
            <p className="text-[10px] text-[#f87171] mt-1.5">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
            Quantity Total
          </label>
          <div className="h-10 border border-border bg-background flex items-center px-3 gap-1">
            <span className="text-[13px] text-foreground font-medium">{totalQty}</span>
            <span className="text-[10px] text-muted-foreground">units</span>
          </div>
        </div>
      </div>

      {/* Size breakdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            Quantity Per Size
          </label>
          {totalQty === 0 && (
            <p className="text-[10px] text-[#fbbf24]">
              Add stock to at least one size
            </p>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {SIZES.map((size) => (
            <div key={size}>
              <div className="border border-border bg-background text-center py-2 text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-1">
                {size}
              </div>
              <input
                type="number"
                min="0"
                defaultValue={0}
                className="w-full h-9 bg-background border border-border text-center text-[13px] text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                {...register(`sizes.${size}`, {
                  min: { value: 0, message: "Cannot be negative" },
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}