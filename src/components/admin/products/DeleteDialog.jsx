"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DeleteDialog({ open, onClose, onConfirm, productName }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0D0D0D] border border-border rounded-none max-w-sm">
        <DialogHeader>
          <DialogTitle
            className="text-[16px] font-light text-foreground tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Remove Entry
          </DialogTitle>
          <DialogDescription className="text-[12px] text-muted-foreground mt-2 leading-relaxed">
            This will permanently remove{" "}
            <span className="text-foreground font-medium">{productName}</span>{" "}
            from the collection inventory. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 mt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-border text-muted-foreground text-[10px] font-bold tracking-[0.16em] uppercase py-2.5 hover:border-foreground/30 hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#f87171] text-[#0D0D0D] text-[10px] font-bold tracking-[0.16em] uppercase py-2.5 hover:bg-[#ef4444] transition-colors"
          >
            Remove
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}