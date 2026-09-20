import OrdersOperations from "@/components/Orders/OrdersOperations";
import OrdersTable from "@/components/Orders/OrdersTable";

function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-foreground">Orders</h1>
      <OrdersOperations />
      <OrdersTable />
    </div>
  );
}

export default OrdersPage;
