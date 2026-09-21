import ExportButtons from "@/components/Orders/ExportButtons";
import OrdersOperations from "@/components/Orders/OrdersOperations";
import OrdersTable from "@/components/Orders/OrdersTable";

function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-12">
        <h1 className="text-xl font-semibold text-foreground">Orders</h1>
        <ExportButtons />
      </div>
      <OrdersOperations />
      <OrdersTable />
    </div>
  );
}

export default OrdersPage;
