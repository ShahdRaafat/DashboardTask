import { STATUS_STYLES } from "@/lib/StatusStyles";
import { Order } from "@/types/Order";

function OrderCard({ order }: { order: Order }) {
  return (
    <div className=" rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground">{order.id}</span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Customer</span>
          <span className="text-foreground">{order.customer}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Category</span>
          <span className="text-foreground">{order.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Amount</span>
          <span className="text-foreground">${order.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Date</span>
          <span className="text-foreground">{order.date}</span>
        </div>
      </div>
    </div>
  );
}
export default OrderCard;
