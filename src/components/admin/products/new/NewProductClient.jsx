"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ProductFormHeader  from "./ProductFormHeader";
import GeneralInfo        from "./GeneralInfo";
import MediaUpload        from "./MediaUpload";
import PricingInventory   from "./PricingInventory";
import ProductVisibility  from "./ProductVisibility";
import FormActions        from "./FormActions";

// Simulating existing SKUs from your database
// Later replace this with: const res = await fetch(`/api/products/check-sku?sku=${sku}`)
const EXISTING_SKUS = ["FRM-C-104-BLK", "FRM-K-882-CRM", "FRM-T-211-GRY"];

export default function NewProductClient() {
  const [images, setImages]       = useState([]);
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:        "",
      description: "",
      category:    "",
      sku:         "",
      price:       "",
      visible:     false,
      sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
    },
  });

  const sizes   = watch("sizes");
  const totalQty = Object.values(sizes).reduce((a, b) => a + Number(b), 0);

  const onSubmit = async (data) => {
    if (images.length === 0) return; // caught by image validation below
    setSubmitState("loading");
    try {
      console.log("Submitting:", { ...data, images, totalQty });
      // await fetch("/api/products", { method: "POST", body: JSON.stringify({...data, images}) })
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="max-w-3xl">
      <ProductFormHeader />

      {/* Success banner */}
      {submitState === "success" && (
        <div className="mb-6 px-4 py-3 border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#4ade80]">
            ✓ Product saved successfully
          </p>
        </div>
      )}

      {/* Error banner */}
      {submitState === "error" && (
        <div className="mb-6 px-4 py-3 border border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.06)]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#f87171]">
            ✗ Something went wrong. Please try again.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6">

          <GeneralInfo
            register={register}
            errors={errors}
            existingSkus={EXISTING_SKUS}
          />

          <MediaUpload
            images={images}
            setImages={setImages}
            imageError={errors.images}
          />

          <PricingInventory
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            sizes={sizes}
            totalQty={totalQty}
          />

          <ProductVisibility
            control={control}
          />

        </div>

        <FormActions loading={submitState === "loading"} />
      </form>
    </div>
  );
}