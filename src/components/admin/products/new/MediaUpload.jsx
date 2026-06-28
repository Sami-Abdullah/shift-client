"use client";
import { useRef } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

export default function MediaUpload({ images, setImages, imageError }) {
  const inputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    const urls  = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls].slice(0, 6));
  };

  const removeImage = (i) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className={`border bg-muted p-6 ${imageError ? "border-[#f87171]" : "border-border"}`}>

      {/* Section label */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ImagePlus size={13} strokeWidth={1.5} className="text-muted-foreground" />
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            Media <span className="text-[#f87171]">*</span>
          </p>
        </div>
        <p className="text-[10px] text-muted-foreground">{images.length} / 6</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-[3/4] bg-background overflow-hidden group">
            <Image
              src={src}
              alt={`Upload ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-2 right-2 w-6 h-6 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f87171] hover:text-background"
            >
              <X size={10} />
            </button>
            {i === 0 && (
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

      {/* Error or hint */}
      {imageError ? (
        <p className="text-[10px] text-[#f87171] mt-3">
          At least one product image is required
        </p>
      ) : (
        <p className="text-[10px] text-muted-foreground mt-3">
          Upload up to 6 images. First image becomes the primary display photo.
        </p>
      )}
    </div>
  );
}