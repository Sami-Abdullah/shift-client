"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { uploadProductImage } from "@/lib/actions/admin/upload";

export default function MediaUpload({ images, setImages, imageError }) {
  const inputRef = useRef(null);
  const [uploadingCount, setUploadingCount] = useState(0);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files).slice(0, 6 - images.length);

    for (const file of files) {
      const previewUrl = URL.createObjectURL(file);
      const tempId = crypto.randomUUID();

      // Show an instant local preview while the real upload happens
      setImages((prev) => [...prev, { id: tempId, url: previewUrl, uploading: true }]);
      setUploadingCount((c) => c + 1);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadProductImage(formData);

        setImages((prev) =>
          prev.map((img) =>
            img.id === tempId ? { ...img, url: result.url, uploading: false } : img
          )
        );
      } catch (err) {
        // Upload failed — remove this image and let the user retry
        setImages((prev) => prev.filter((img) => img.id !== tempId));
      } finally {
        setUploadingCount((c) => c - 1);
      }
    }

    e.target.value = ""; // allow re-selecting the same file if needed
  };

  const removeImage = (id) =>
    setImages((prev) => prev.filter((img) => img.id !== id));

  return (
    <div className={`border bg-muted p-6 ${imageError ? "border-[#f87171]" : "border-border"}`}>

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ImagePlus size={13} strokeWidth={1.5} className="text-muted-foreground" />
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            Media <span className="text-[#f87171]">*</span>
          </p>
        </div>
        <p className="text-[10px] text-muted-foreground">{images.length} / 6</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div key={img.id} className="relative aspect-[3/4] bg-background overflow-hidden group">
            <Image
              src={img.url}
              alt={`Upload ${i + 1}`}
              fill
              className={`object-cover ${img.uploading ? "opacity-40" : ""}`}
              unoptimized
            />
            {img.uploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 size={20} className="animate-spin text-foreground" />
              </div>
            )}
            <button
              type="button"
              onClick={() => removeImage(img.id)}
              disabled={img.uploading}
              className="absolute top-2 right-2 w-6 h-6 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f87171] hover:text-background disabled:opacity-0"
            >
              <X size={10} />
            </button>
            {i === 0 && !img.uploading && (
              <span className="absolute bottom-2 left-2 text-[8px] font-bold tracking-[0.14em] uppercase bg-foreground text-background px-2 py-0.5">
                Primary
              </span>
            )}
          </div>
        ))}

        {images.length < 6 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-[3/4] border border-dashed border-border hover:border-foreground/30 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors bg-background"
          >
            <ImagePlus size={18} strokeWidth={1} />
            <span className="text-[9px] font-bold tracking-[0.14em] uppercase">
              Add Image
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />

      {imageError ? (
        <p className="text-[10px] text-[#f87171] mt-3">
          At least one product image is required
        </p>
      ) : (
        <p className="text-[10px] text-muted-foreground mt-3">
          Upload up to 6 images. First image becomes the primary display photo.
          {uploadingCount > 0 && " Uploading..."}
        </p>
      )}
    </div>
  );
}