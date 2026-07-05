import { serverFetch } from "@/lib/core/server";

export async function getDashboardAnalytics() {
  return serverFetch("/api/orders/analytics");
}

export async function getSalesChart(period = "weekly") {
  return serverFetch(`/api/orders/analytics/sales-chart?period=${period}`);
}

export async function getTopProducts() {
  return serverFetch("/api/orders/analytics/top-products");
}