"use client";

import { useAppSelector } from "@/store/hooks";
import { getFinalOrders } from "@/lib/OrderOperations";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "../ui/Pagination";
import OrderCard from "./OrderCard";

export default function OrdersTable() {
  const filters = useAppSelector((state) => state.orders);
  const { items, totalItems, totalPages } = getFinalOrders(filters);

  return (
    <>
      <div className="hidden lg:block mt-4 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader />

            <tbody className="divide-y divide-border">
              {items.map((order) => (
                <TableRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
        {items.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div className="flex flex-col-reverse md:flex-row   items-center justify-between border-t border-border gap-2 ">
        <p className=" px-4 py-3 text-xs text-muted">
          Showing <span className="font-bold">{items.length}</span> of{" "}
          <span className="font-bold">{totalItems}</span> results — page{" "}
          <span className="font-bold">{filters.currentPage}</span> of{" "}
          <span className="font-bold"> {totalPages}</span>
        </p>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
