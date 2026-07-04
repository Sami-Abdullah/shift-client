"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import GeneralInfo from "../new/GeneralInfo";
import MediaUpload from "../new/MediaUpload";
import PricingInventory from "../new/PricingInventory";
import ProductVisibility from "../new/ProductVisibility";


// All existing SKUs except the current product's own SKU
// In production: fetch from API
const ALL_SKUS = [
  "FRM-C-104-BLK",
  "FRM-K-882-CRM",
  "FRM-T-211-GRY",
  "FRM-S-445-BLK",
  "FRM-A-009-TAN",
  "FRM-F-330-BLK",
];

export default function EditProductClient({ product }) {
  const router = useRouter();

  // Exclude the current product's own SKU from duplicate check
  const existingSkus = ALL_SKUS.filter((s) => s !== product.sku);

  const [images, setImages] = useState(product.images || []);
  const [submitState, setSubmitState] = useState("idle");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      sku: product.sku,
      price: product.price,
      visible: product.visible,
      sizes: product.sizes,
    },
  });

  const sizes = watch("sizes");
  const totalQty = Object.values(sizes).reduce((a, b) => a + Number(b), 0);

  const onSubmit = async (data) => {
    setSubmitState("loading");
    try {
      console.log("Updating product:", product.id, { ...data, images, totalQty });
      // await fetch(`/api/products/${product.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...data, images, totalQty }),
      // });
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="max-w-3xl">

      {/* Header */}
      <div className="mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-5">
          <Link
            href="/admin/products"
            className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <ChevronRight size={10} className="text-muted-foreground" />
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-muted-foreground">
            {product.name}
          </span>
          <ChevronRight size={10} className="text-muted-foreground" />
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-foreground">
            Edit
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h1
            className="text-[36px] font-light tracking-[0.06em] text-foreground leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Edit Product
          </h1>
          {/* Unsaved changes indicator */}
          {isDirty && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#fbbf24]">
                Unsaved changes
              </span>
            </div>
          )}
        </div>

        {/* Product ID */}
        <p className="text-[10px] font-mono text-muted-foreground mt-2">
          ID: {product.id} · SKU: {product.sku}
        </p>
      </div>

      {/* Banners */}
      {submitState === "success" && (
        <div className="mb-6 px-4 py-3 border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#4ade80]">
            ✓ Product updated successfully
          </p>
        </div>
      )}
      {submitState === "error" && (
        <div className="mb-6 px-4 py-3 border border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.06)]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#f87171]">
            ✗ Something went wrong. Please try again.
          </p>
        </div>
      )}

      {/* Form — reusing all components from new product */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6">

          <GeneralInfo 
            register={register} 
            errors={errors} 
            excludeId={product._id} 
          />

          <MediaUpload
            images={images}
            setImages={setImages}
            imageError={images.length === 0 ? { message: "At least one image is required" } : null}
          />

          <PricingInventory
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            sizes={sizes}
            totalQty={totalQty}
          />

          <ProductVisibility control={control} />

        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          {/* Danger zone */}
          <button
            type="button"
            className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#f87171]/50 hover:text-[#f87171] transition-colors border border-transparent hover:border-[rgba(248,113,113,0.3)] px-4 py-2.5"
          >
            Delete Product
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="px-6 py-2.5 border border-border text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitState === "loading"}
              className="px-8 py-2.5 bg-foreground text-background text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitState === "loading" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}