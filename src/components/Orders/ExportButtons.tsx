"use client";

import { FileText, FileSpreadsheet } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { getAllFilteredOrders } from "@/lib/OrderOperations";
import { exportToPDF, exportToExcel } from "@/lib/exportOrders";
import Button from "@/components/ui/Button";

export default function ExportButtons() {
  const filters = useAppSelector((state) => state.orders);

  function handleExportPdf() {
    const orders = getAllFilteredOrders(filters);
    exportToPDF(orders);
  }

  function handleExportExcel() {
    const orders = getAllFilteredOrders(filters);
    exportToExcel(orders);
  }

  return (
    <div className="flex gap-2">
      <Button variant="ghost" onClick={handleExportPdf} className="gap-2">
        <FileText className="h-4 w-4" />
        PDF
      </Button>
      <Button variant="ghost" onClick={handleExportExcel} className="gap-2">
        <FileSpreadsheet className="h-4 w-4" />
        Excel
      </Button>
    </div>
  );
}
