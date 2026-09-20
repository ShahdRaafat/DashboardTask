import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type sortDirection = "asc" | "desc";
export type sortBy = "date" | "customer" | "amount";

type OrderState = {
  searchTerm: string;
  statusFilter: string;
  sortBy: sortBy;
  sortDirection: sortDirection;
  currentPage: number;
  pageSize: number;
};
const initialState: OrderState = {
  searchTerm: "",
  statusFilter: "all",
  sortBy: "date",
  sortDirection: "desc",
  currentPage: 1,
  pageSize: 5,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },
    setSort: (state, action: PayloadAction<sortBy>) => {
      state.sortBy = action.payload;
    },
    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setStatusFilter,
  setSort,
  toggleSortDirection,
  setPage,
} = orderSlice.actions;

export default orderSlice.reducer;
