"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import OrderDetailHeader from "./OrderDetailHeader";
import OrderItems from "./OrderItems";
import CustomerInfo from "./CustomerInfo";
import PaymentInfo from "./PaymentInfo";
import OrderTimeline from "./OrderTimeline";
import RefundDialog from "./RefundDialog";
import { issueRefund } from "@/lib/actions/admin/orders";

export default function OrderDetailClient({ order }) {
  const [showRefund, setShowRefund] = useState(false);
  const [refunding, setRefunding]   = useState(false);

  const handleRefund = async (amount, reason) => {
    setRefunding(true);
    try {
      await issueRefund(order._id, { amount, reason });
      toast.success("Refund issued successfully");
      setShowRefund(false);
    } catch (err) {
      toast.error(err.message || "Failed to issue refund");
    } finally {
      setRefunding(false);
    }
  };

  return (
    <div>
      <OrderDetailHeader order={order} onRefund={() => setShowRefund(true)} />

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2 flex flex-col gap-6">
          <OrderItems order={order} />
          <OrderTimeline timeline={order.timeline} />
        </div>
        <div className="flex flex-col gap-6">
          <CustomerInfo order={order} />
          <PaymentInfo order={order} />
        </div>
      </div>

      <RefundDialog
        open={showRefund}
        onClose={() => setShowRefund(false)}
        order={order}
        onConfirm={handleRefund}
        loading={refunding}
      />
    </div>
  );
}