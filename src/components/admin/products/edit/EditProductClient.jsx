"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import GeneralInfo from "../new/GeneralInfo";
import MediaUpload from "../new/MediaUpload";
import PricingInventory from "../new/PricingInventory";
import ProductVisibility from "../new/ProductVisibility";
import DeleteDialog from "../DeleteDialog";
import { updateProduct, deleteProduct } from "@/lib/actions/admin/products";

export default function EditProductClient({ product }) {
  const router = useRouter();

  const [images, setImages] = useState(
    (product.images || []).map((url) => ({
      id: crypto.randomUUID(),
      url,
      uploading: false,
    }))
  );
  const [submitState, setSubmitState] = useState("idle");
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

      await updateProduct(product._id, payload);
      toast.success("Product updated successfully");

      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
      setSubmitState("idle");
    }
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product._id);
      toast.success("Product deleted");
      router.push("/admin/products");
    } catch (err) {
      toast.error(err.message || "Failed to delete product");
      setShowDelete(false);
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
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
          {isDirty && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#fbbf24]">
                Unsaved changes
              </span>
            </div>
          )}
        </div>

        <p className="text-[10px] font-mono text-muted-foreground mt-2">
          ID: {product._id} · SKU: {product.sku}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6">
          <GeneralInfo register={register} errors={errors} excludeId={product._id} />

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

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => setShowDelete(true)}
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
              disabled={submitState === "loading" || stillUploading}
              className="px-8 py-2.5 bg-foreground text-background text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitState === "loading" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>

      <DeleteDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleConfirmDelete}
        productName={product.name}
        loading={deleting}
      />
    </div>
  );
}