"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchTerm, setStatusFilter } from "@/features/orders/orderSlice";
import { ORDER_STATUS_OPTIONS } from "@/lib/filterOptions";
import Searchbar from "../ui/Searchbar";
import Filter from "../ui/Filter";
import SortDropdown from "../ui/SortDropdown";

function OrdersOperations() {
  const dispatch = useAppDispatch();
  const { searchTerm, statusFilter, sortDirection } = useAppSelector(
    (state) => state.orders,
  );
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Searchbar
        defaultValue={searchTerm}
        onSearch={(value) => dispatch(setSearchTerm(value))}
        placeholder="Search by customer or order ID..."
      />
      <div className="flex flex-wrap items-center gap-3">
        <Filter
          options={ORDER_STATUS_OPTIONS}
          activeValue={statusFilter}
          onChange={(value) => dispatch(setStatusFilter(value))}
        />
        <SortDropdown />
      </div>
    </div>
  );
}
export default OrdersOperations;
