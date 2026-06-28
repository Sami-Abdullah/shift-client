"use client";
import { useState } from "react";
import OrdersHeader  from "./OrdersHeader";
import OrdersFilter  from "./OrdersFilter";
import OrdersTable   from "./OrdersTable";

export const ORDERS = [
  {
    id: "FRM-5021",
    customer:  { name: "Isabelle Fontaine", email: "i.fontaine@email.com", location: "Paris, FR" },
    items:     [{ name: "Cashmere Column Coat",       size: "M",  qty: 1, price: 2890, img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=120&q=80&auto=format&fit=crop" }],
    shipping:  { address: "14 Rue du Faubourg", city: "Paris", postal: "75008", country: "France", method: "Express", tracking: "DHL-8821-FR" },
    payment:   { method: "Visa", last4: "4242", status: "paid", intentId: "pi_abc123" },
    subtotal:  2890, shippingCost: 0, tax: 289, total: 3179,
    status:    "delivered",
    createdAt: "2026-06-24T10:30:00Z",
    updatedAt: "2026-06-25T14:00:00Z",
    timeline: [
      { status: "pending",    date: "24 Jun 2026, 10:30", note: "Order placed" },
      { status: "processing", date: "24 Jun 2026, 11:00", note: "Payment confirmed" },
      { status: "shipped",    date: "25 Jun 2026, 09:00", note: "Dispatched via DHL Express" },
      { status: "delivered",  date: "26 Jun 2026, 14:00", note: "Delivered to recipient" },
    ],
    refund: null,
  },
  {
    id: "FRM-5020",
    customer:  { name: "James Okafor", email: "j.okafor@email.com", location: "London, UK" },
    items:     [{ name: "Obsidian Structured Blazer",  size: "L",  qty: 1, price: 1240, img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e21?w=120&q=80&auto=format&fit=crop" }],
    shipping:  { address: "22 Mayfair Lane", city: "London", postal: "W1K 2JT", country: "UK", method: "Standard", tracking: "RM-4421-UK" },
    payment:   { method: "Mastercard", last4: "5531", status: "paid", intentId: "pi_def456" },
    subtotal:  1240, shippingCost: 15, tax: 124, total: 1379,
    status:    "shipped",
    createdAt: "2026-06-24T08:00:00Z",
    updatedAt: "2026-06-25T10:00:00Z",
    timeline: [
      { status: "pending",    date: "24 Jun 2026, 08:00", note: "Order placed" },
      { status: "processing", date: "24 Jun 2026, 08:30", note: "Payment confirmed" },
      { status: "shipped",    date: "25 Jun 2026, 10:00", note: "Dispatched via Royal Mail" },
    ],
    refund: null,
  },
  {
    id: "FRM-5019",
    customer:  { name: "Yui Tanaka", email: "y.tanaka@email.com", location: "Tokyo, JP" },
    items:     [{ name: "Saddle Leather Tote",         size: "OS", qty: 1, price: 1650, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&q=80&auto=format&fit=crop" }],
    shipping:  { address: "3-12 Aoyama", city: "Tokyo", postal: "107-0062", country: "Japan", method: "Express", tracking: "" },
    payment:   { method: "Visa", last4: "9012", status: "paid", intentId: "pi_ghi789" },
    subtotal:  1650, shippingCost: 25, tax: 165, total: 1840,
    status:    "processing",
    createdAt: "2026-06-23T15:00:00Z",
    updatedAt: "2026-06-23T15:30:00Z",
    timeline: [
      { status: "pending",    date: "23 Jun 2026, 15:00", note: "Order placed" },
      { status: "processing", date: "23 Jun 2026, 15:30", note: "Payment confirmed" },
    ],
    refund: null,
  },
  {
    id: "FRM-5018",
    customer:  { name: "Omar Hassan", email: "o.hassan@email.com", location: "Dubai, AE" },
    items:     [{ name: "Merino Turtleneck",           size: "XL", qty: 2, price: 480,  img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=120&q=80&auto=format&fit=crop" }],
    shipping:  { address: "Sheikh Zayed Rd, Suite 12", city: "Dubai", postal: "00000", country: "UAE", method: "Standard", tracking: "" },
    payment:   { method: "Amex", last4: "3782", status: "paid", intentId: "pi_jkl012" },
    subtotal:  960, shippingCost: 35, tax: 0, total: 995,
    status:    "pending",
    createdAt: "2026-06-23T12:00:00Z",
    updatedAt: "2026-06-23T12:00:00Z",
    timeline: [
      { status: "pending",    date: "23 Jun 2026, 12:00", note: "Order placed" },
    ],
    refund: null,
  },
  {
    id: "FRM-5017",
    customer:  { name: "Elena Rossi", email: "e.rossi@email.com", location: "Milan, IT" },
    items:     [{ name: "Silk Bias-Cut Dress",         size: "S",  qty: 1, price: 1890, img: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=120&q=80&auto=format&fit=crop" }],
    shipping:  { address: "Via Montenapoleone 8", city: "Milan", postal: "20121", country: "Italy", method: "Express", tracking: "IT-7712-MI" },
    payment:   { method: "Visa", last4: "1234", status: "refunded", intentId: "pi_mno345" },
    subtotal:  1890, shippingCost: 0, tax: 189, total: 2079,
    status:    "cancelled",
    createdAt: "2026-06-22T09:00:00Z",
    updatedAt: "2026-06-22T14:00:00Z",
    timeline: [
      { status: "pending",    date: "22 Jun 2026, 09:00", note: "Order placed" },
      { status: "processing", date: "22 Jun 2026, 09:30", note: "Payment confirmed" },
      { status: "cancelled",  date: "22 Jun 2026, 14:00", note: "Cancelled by customer" },
    ],
    refund: { amount: 2079, reason: "Customer requested cancellation", date: "22 Jun 2026", stripeRefundId: "re_abc123" },
  },
];

const STATUS_FILTERS = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersClient() {
  const [orders, setOrders]           = useState(ORDERS);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter]   = useState("All");

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || o.status === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, newStatus, trackingNumber) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: newStatus,
              payment: { ...o.payment, status: newStatus === "cancelled" ? "refunded" : o.payment.status },
              shipping: trackingNumber ? { ...o.shipping, tracking: trackingNumber } : o.shipping,
              timeline: [
                ...o.timeline,
                {
                  status: newStatus,
                  date:   new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
                  note:   trackingNumber ? `Dispatched · Tracking: ${trackingNumber}` : `Status updated to ${newStatus}`,
                },
              ],
            }
          : o
      )
    );
  };

  return (
    <>
      <OrdersHeader total={filtered.length} />
      <OrdersFilter
        search={search}
        onSearch={setSearch}
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        onDateFilter={setDateFilter}
        filters={STATUS_FILTERS}
      />
      <OrdersTable orders={filtered} onUpdateStatus={updateStatus} />
    </>
  );
}