"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage } from "@/features/orders/orderSlice";
import Button from "./Button";

type PaginationProps = {
  totalPages: number;
};
function Pagination({ totalPages }: PaginationProps) {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.orders);

  return (
    <div className="flex items-center justify-center gap-1 border-t border-border px-4 py-3">
      <Button
        variant="ghost"
        onClick={() => dispatch(setPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onClick={() => dispatch(setPage(page))}
          variant={page === currentPage ? "primary" : "ghost"}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        onClick={() => dispatch(setPage(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;
