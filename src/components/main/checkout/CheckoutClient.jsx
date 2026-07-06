"use client";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { getStripe } from "@/lib/stripe-client";
import { createPaymentIntent } from "@/lib/actions/customer/checkout";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import CheckoutSummary from "./CheckoutSummary";

const stripeAppearance = {
  theme: "night",
  variables: {
    colorPrimary: "#F2F2F2",
    colorBackground: "#0D0D0D",
    colorText: "#F2F2F2",
    colorTextSecondary: "#D9D9D9",
    colorDanger: "#f87171",
    fontFamily: "Inter, sans-serif",
    borderRadius: "0px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid rgba(217, 217, 217, 0.15)",
      backgroundColor: "transparent",
      padding: "12px",
    },
    ".Input:focus": {
      border: "1px solid rgba(217, 217, 217, 0.4)",
      boxShadow: "none",
    },
    ".Label": {
      fontSize: "10px",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "rgba(217, 217, 217, 0.6)",
      marginBottom: "8px",
    },
    ".Tab": {
      border: "1px solid rgba(217, 217, 217, 0.1)",
      backgroundColor: "transparent",
    },
    ".Tab--selected": {
      border: "1px solid rgba(217, 217, 217, 0.4)",
      backgroundColor: "#1A1A1A",
    },
  },
};

export default function CheckoutClient({ cart }) {
  const [step, setStep] = useState("shipping");
  const [clientSecret, setClientSecret] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShippingSubmit = async (shippingAddress) => {
    setLoading(true);
    try {
      const data = await createPaymentIntent(shippingAddress);
      setClientSecret(data.clientSecret);
      setTotal(data.total);
      setStep("payment");
    } catch (err) {
      toast.error(err.message || "Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-brand-neutral text-brand-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-brand-secondary font-serif mb-3">
          Checkout
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 flex items-center justify-center text-[10px] border ${
              step === "shipping" ? "border-brand-secondary text-brand-secondary" : "border-brand-primary/20 text-brand-primary/40"
            }`}>1</span>
            <span className={`text-[10px] uppercase tracking-[0.2em] ${
              step === "shipping" ? "text-brand-secondary" : "text-brand-primary/40"
            }`}>Shipping</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 flex items-center justify-center text-[10px] border ${
              step === "payment" ? "border-brand-secondary text-brand-secondary" : "border-brand-primary/20 text-brand-primary/40"
            }`}>2</span>
            <span className={`text-[10px] uppercase tracking-[0.2em] ${
              step === "payment" ? "text-brand-secondary" : "text-brand-primary/40"
            }`}>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <ShippingForm onSubmit={handleShippingSubmit} loading={loading} />
            )}

            {step === "payment" && clientSecret && (
              <Elements stripe={getStripe()} options={{ clientSecret, appearance: stripeAppearance }}>
                <PaymentForm />
              </Elements>
            )}
          </div>

          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}