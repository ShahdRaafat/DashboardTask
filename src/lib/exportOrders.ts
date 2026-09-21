import { Order } from "@/types/Order";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const COLUMNS = [
  "Order ID",
  "Customer",
  "Category",
  "Amount",
  "Status",
  "Date",
];

function toRowsForPDF(orders: Order[]) {
  return orders.map((order) => [
    order.id,
    order.customer,
    order.category,
    `$${order.amount}`,
    order.status,
    order.date,
  ]);
}

function toRowsForExcel(orders: Order[]) {
  return orders.map((order) => ({
    "Order ID": order.id,
    Customer: order.customer,
    Category: order.category,
    Amount: order.amount,
    Status: order.status,
    Date: order.date,
  }));
}

export function exportToPDF(orders: Order[]) {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("Orders Report", 15, 20);
  const rows = toRowsForPDF(orders);
  autoTable(doc, {
    head: [COLUMNS],
    body: rows,
    startY: 30,
  });
  doc.save("orders.pdf");
}

export function exportToExcel(orders: Order[]) {
  const rows = toRowsForExcel(orders);

  const worksheet = XLSX.utils.json_to_sheet(rows);

  //setting column widths cause it was so narrow
  /*   worksheet["!cols"] = [
    { wch: 12 },
    { wch: 20 },
    { wch: 16 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
  ]; */

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, "orders.xlsx");
}
