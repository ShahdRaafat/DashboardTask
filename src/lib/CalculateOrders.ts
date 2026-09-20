import ordersData from "@/data/orders.json";
import { Order, OrderStatus } from "@/types/Order";

const orders: Order[] = ordersData as Order[];

//for legend component to get the true colors of status
const COLORS: Record<string, string> = {
  completed: "var(--color-success)",
  pending: "var(--color-warning)",
  cancelled: "var(--color-danger)",
};

// for areaa chart
export function getMonthlyRevenue(): { month: string; revenue: number }[] {
  const totalRevenues = new Map<string, number>();
  for (const order of orders) {
    if (order.status === "cancelled") continue;
    const month = order.date.slice(0, 7);
    const currentRevenue = totalRevenues.get(month) || 0;
    totalRevenues.set(month, currentRevenue + order.amount);
  }
  const sortedRevenues = Array.from(totalRevenues.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  return sortedRevenues.map(([month, revenue]) => ({ month, revenue }));
}

//for pie chart
export function getStatusBreakdown() {
  const counts = new Map<OrderStatus, number>();

  for (const order of orders) {
    counts.set(order.status, (counts.get(order.status) || 0) + 1);
  }

  return Array.from(counts.entries()).map(([status, count]) => ({
    status,
    count,
    fill: COLORS[status],
  }));
}

//for bar chart
export function getCategoryBreakdown() {
  const totals = new Map<string, number>();

  for (const order of orders) {
    if (order.status === "cancelled") continue;
    totals.set(
      order.category,
      (totals.get(order.category) || 0) + order.amount,
    );
  }

  return Array.from(totals.entries()).map(([category, total]) => ({
    category,
    total,
  }));
}
