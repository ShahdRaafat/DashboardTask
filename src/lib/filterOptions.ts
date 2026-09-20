import { sortBy } from "@/features/orders/orderSlice";
import { statusFilter } from "@/types/Order";

export const ORDER_STATUS_OPTIONS: { label: string; value: statusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];

export const SORT_OPTIONS: { label: string; value: sortBy }[] = [
  { label: "Sort by Customer", value: "customer" },
  { label: "Sort by Amount", value: "amount" },
  { label: "Sort by Date", value: "date" },
];
