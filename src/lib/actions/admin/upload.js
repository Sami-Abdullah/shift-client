"use server";

import cloudinary from "@/lib/cloudinary";

export async function uploadProductImage(formData) {
  const file = formData.get("file");

  if (!file) {
    throw new Error("No file provided");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "ferrum/products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

  return { url: result.secure_url, publicId: result.public_id };
}