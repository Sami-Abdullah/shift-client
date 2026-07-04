"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProductFormHeader  from "./ProductFormHeader";
import GeneralInfo        from "./GeneralInfo";
import MediaUpload        from "./MediaUpload";
import PricingInventory   from "./PricingInventory";
import ProductVisibility  from "./ProductVisibility";
import FormActions        from "./FormActions";
import { createProduct }  from "@/lib/actions/admin/products";

export default function NewProductClient() {
  const router = useRouter();
  const [images, setImages]           = useState([]);
  const [submitState, setSubmitState] = useState("idle"); // idle | loading

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

    try {
      const payload = {
        ...data,
        price: Number(data.price),
        images: images.map((img) => img.url),
        sizes,
      };

      await createProduct(payload);
      toast.success("Product saved successfully");

      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
      setSubmitState("idle");
    }
  };

  return (
    <div className="max-w-3xl">
      <ProductFormHeader />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6">

          <GeneralInfo register={register} errors={errors} />

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