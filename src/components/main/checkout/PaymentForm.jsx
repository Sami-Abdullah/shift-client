"use client";
import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMsg(error.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-[10px] uppercase tracking-[0.25em] text-brand-primary/50 font-medium pb-3 border-b border-border">
        Payment
      </h2>

      <PaymentElement />

      {errorMsg && <p className="text-[11px] text-red-400">{errorMsg}</p>}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-none bg-brand-secondary text-brand-neutral font-medium text-[10px] uppercase tracking-[0.25em] py-6 hover:bg-white transition-colors"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}