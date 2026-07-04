import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { checkSkuAvailability } from "@/lib/actions/admin/products";

const CATEGORIES = [
  "Outerwear", "Knitwear", "Tops",
  "Bottoms", "Accessories", "Footwear",
];

const SKU_PATTERN = /^FRM-[A-Z]+-\d{3}-[A-Z]+$/;

export default function GeneralInfo({ register, errors, excludeId  }) {
  return (
    <div className="border border-border bg-muted p-6">

      {/* Section label */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        <Info size={13} strokeWidth={1.5} className="text-muted-foreground" />
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          General Information
        </p>
      </div>

      {/* Product Name */}
      <div className="mb-5">
        <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
          Product Name <span className="text-[#f87171]">*</span>
        </label>
        <Input
          placeholder="e.g. Minimalist Wool Overcoat"
          className={`rounded-none bg-background border-border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 h-10 text-[13px] transition-colors ${errors.name ? "border-[#f87171]" : "focus-visible:border-foreground/30"
            }`}
          {...register("name", {
            required: "Product name is required",
            minLength: { value: 3, message: "Name must be at least 3 characters" },
          })}
        />
        {errors.name && (
          <p className="text-[10px] text-[#f87171] mt-1.5">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
          Description <span className="text-[#f87171]">*</span>
        </label>
        <div className="flex items-center gap-1 border border-border border-b-0 bg-background px-3 py-2">
          {["B", "I", "•—", "⌘"].map((tool) => (
            <button
              type="button"
              key={tool}
              className="w-7 h-7 flex items-center justify-center text-[11px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {tool}
            </button>
          ))}
        </div>
        <textarea
          placeholder="Describe the craftsmanship and materials..."
          rows={5}
          className={`w-full bg-background border px-4 py-3 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none resize-none transition-colors ${errors.description ? "border-[#f87171]" : "border-border focus:border-foreground/30"
            }`}
          {...register("description", {
            required: "Description is required",
            minLength: { value: 20, message: "Description must be at least 20 characters" },
          })}
        />
        {errors.description && (
          <p className="text-[10px] text-[#f87171] mt-1.5">{errors.description.message}</p>
        )}
      </div>

      {/* Category + SKU */}
      <div className="grid grid-cols-2 gap-4">

        {/* Category */}
        <div>
          <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
            Category <span className="text-[#f87171]">*</span>
          </label>
          <select
            className={`w-full h-10 bg-background border px-3 text-[13px] text-foreground focus:outline-none transition-colors appearance-none cursor-pointer ${errors.category ? "border-[#f87171]" : "border-border focus:border-foreground/30"
              }`}
            {...register("category", {
              required: "Please select a category",
            })}
          >
            <option value="" disabled className="bg-background text-muted-foreground">
              Select Category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-background">
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-[10px] text-[#f87171] mt-1.5">{errors.category.message}</p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className="block text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground mb-2">
            SKU <span className="text-[#f87171]">*</span>
          </label>
          <Input
            placeholder="FRM-OUT-001-BLK"
            className={`rounded-none bg-background border-border text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 h-10 text-[13px] font-mono transition-colors ${errors.sku ? "border-[#f87171]" : "focus-visible:border-foreground/30"
              }`}
            {...register("sku", {
              required: "SKU is required",
              pattern: {
                value: SKU_PATTERN,
                message: "Format must be FRM-XXX-000-XXX (e.g. FRM-OUT-001-BLK)",
              },
              validate: {
                unique: async (value) => {
                  const available = await checkSkuAvailability(value, excludeId);
                  return available || "This SKU already exists — each product must have a unique SKU";
                },
              },
            })}
          />
          {errors.sku ? (
            <p className="text-[10px] text-[#f87171] mt-1.5">{errors.sku.message}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground/50 mt-1.5">
              Format: FRM-OUT-001-BLK
            </p>
          )}
        </div>

      </div>
    </div>
  );
}