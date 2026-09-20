export type OrderStatus = "pending" | "completed" | "cancelled";

export type Order = {
  id: string;
  customer: string;
  category: string;
  amount: number;
  status: OrderStatus;
  date: string;
};

export type SortField = "date" | "amount" | "customer";
export type SortDirection = "asc" | "desc";

export type statusFilter = OrderStatus | "all";
