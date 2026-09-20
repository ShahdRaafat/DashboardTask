"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSort,
  sortBy,
  toggleSortDirection,
} from "@/features/orders/orderSlice";
import { SORT_OPTIONS } from "@/lib/filterOptions";
import Button from "./Button";
import { ArrowDown, ArrowUp } from "lucide-react";

function SortDropdown() {
  const dispatch = useAppDispatch();
  const { sortBy, sortDirection } = useAppSelector((state) => state.orders);

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2 text-sm text-muted font-medium">
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSort(e.target.value as sortBy))}
          className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <Button
        variant="ghost"
        onClick={() => dispatch(toggleSortDirection())}
        title={sortDirection === "asc" ? "Ascending" : "Descending"}
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
export default SortDropdown;
