"use client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { X, Minus, Plus } from "lucide-react";
import { updateCartItem, removeFromCart } from "@/lib/actions/customer/cart";

export default function CartItem({ item }) {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (next) => {
    if (next < 1) return;
    setQuantity(next);
    startTransition(async () => {
      await updateCartItem(item.product, item.size, next);
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      await removeFromCart(item.product, item.size);
    });
  };

  return (
    <div className={`flex gap-4 py-6 border-b border-zinc-900 ${isPending ? "opacity-50" : ""}`}>
      <div className="relative w-20 h-24 bg-zinc-900 shrink-0 overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xs font-serif text-zinc-200 uppercase tracking-wide">{item.name}</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Size: {item.size}</p>
          </div>
          <button
            onClick={handleRemove}
            disabled={isPending}
            className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-zinc-800">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isPending}
              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <Minus size={11} />
            </button>
            <span className="w-8 text-center text-xs text-zinc-200">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isPending}
              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <Plus size={11} />
            </button>
          </div>

          <p className="text-xs text-zinc-300 font-serif">
            ${(item.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}