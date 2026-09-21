import orders from "@/data/orders.json";
import { sortBy, sortDirection } from "@/features/orders/orderSlice";
import { Order } from "@/types/Order";

export type OrderOperations = {
  searchTerm: string;
  statusFilter: string;
  sortBy: sortBy;
  sortDirection: sortDirection;
  currentPage: number;
  pageSize: number;
};

const ordersData = orders as Order[];

function filterByStatus(list: Order[], statusFilter: string) {
  if (statusFilter === "all") return list;
  return list.filter((order) => order.status === statusFilter);
}

function searchOrders(list: Order[], searchTerm: string) {
  if (!searchTerm) return list;
  const term = searchTerm.toLowerCase();
  return list.filter(
    (order) =>
      order.customer.toLowerCase().includes(term) ||
      order.id.toLowerCase().includes(term),
  );
}

function sortOrders(
  list: Order[],
  sortBy: sortBy,
  sortDirection: sortDirection,
) {
  return [...list].sort((a, b) => {
    const valueA = String(a[sortBy]);
    const valueB = String(b[sortBy]);
    const comparison = valueA.localeCompare(valueB, undefined, {
      numeric: true,
    });
    return sortDirection === "asc" ? comparison : -comparison;
  });
}

function paginate(list: Order[], currentPage: number, pageSize: number) {
  const totalItems = list.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;

  return {
    items: list.slice(startIndex, startIndex + pageSize),
    totalItems,
    totalPages,
  };
}

export function getFinalOrders(operations: OrderOperations) {
  let result = filterByStatus(ordersData, operations.statusFilter);
  result = searchOrders(result, operations.searchTerm);
  result = sortOrders(result, operations.sortBy, operations.sortDirection);

  return paginate(result, operations.currentPage, operations.pageSize);
}

//for the export functionality
export function getAllFilteredOrders(operations: OrderOperations) {
  let result = filterByStatus(ordersData, operations.statusFilter);
  result = searchOrders(result, operations.searchTerm);
  result = sortOrders(result, operations.sortBy, operations.sortDirection);
  return result;
}
