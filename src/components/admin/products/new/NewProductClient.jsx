"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductFormHeader  from "./ProductFormHeader";
import GeneralInfo        from "./GeneralInfo";
import MediaUpload        from "./MediaUpload";
import PricingInventory   from "./PricingInventory";
import ProductVisibility  from "./ProductVisibility";
import FormActions        from "./FormActions";
import { createProduct }  from "@/lib/actions/admin/products";

// TODO: replace with a real fetch — see note below
const EXISTING_SKUS = ["FRM-C-104-BLK", "FRM-K-882-CRM", "FRM-T-211-GRY"];

export default function NewProductClient() {
  const router = useRouter();
  const [images, setImages]           = useState([]); // [{ id, url, uploading }]
  const [submitState, setSubmitState] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

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

  const sizes    = watch("sizes");
  const totalQty = Object.values(sizes).reduce((a, b) => a + Number(b), 0);

  const stillUploading = images.some((img) => img.uploading);

  const onSubmit = async (data) => {
    if (images.length === 0 || stillUploading) return;

    setSubmitState("loading");
    setErrorMessage("");

    try {
      const payload = {
        ...data,
        price: Number(data.price),
        images: images.map((img) => img.url), // strip down to plain URL strings
        sizes,
      };

      await createProduct(payload);
      setSubmitState("success");

      // Give the success banner a moment to show, then go back to the list
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message);
      setSubmitState("error");
    }
  };

  return (
    <div className="max-w-3xl">
      <ProductFormHeader />

      {submitState === "success" && (
        <div className="mb-6 px-4 py-3 border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.06)]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#4ade80]">
            ✓ Product saved successfully
          </p>
        </div>
      )}

      {submitState === "error" && (
        <div className="mb-6 px-4 py-3 border border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.06)]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#f87171]">
            ✗ {errorMessage || "Something went wrong. Please try again."}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6">

          <GeneralInfo
            register={register}
            errors={errors}

          />

          <MediaUpload
            images={images}
            setImages={setImages}
            imageError={images.length === 0 ? errors.images : null}
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

        <FormActions loading={submitState === "loading" || stillUploading} />
      </form>
    </div>
  );
}