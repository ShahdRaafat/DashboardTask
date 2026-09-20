import { Order } from "@/types/Order";

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-success-bg text-success",
  pending: "bg-warning-bg text-warning",
  cancelled: "bg-danger-bg text-danger",
};

function TableRow({ order }: { order: Order }) {
  return (
    <tr key={order.id} className="hover:bg-background/60 font-semibold">
      <td className="px-4 py-5 font-medium text-foreground">{order.id}</td>
      <td className="px-4 py-5 text-foreground">{order.customer}</td>
      <td className="px-4 py-5 text-muted">{order.category}</td>
      <td className="px-4 py-5 text-foreground">${order.amount}</td>
      <td className="px-4 py-5">
        <span
          className={`inline-flex w-24 items-center justify-center rounded-full px-2.5 py-1 text-xs capitalize ${STATUS_STYLES[order.status]}`}
        >
          {order.status}
        </span>
      </td>
      <td className="px-4 py-5 text-muted ">{order.date}</td>
    </tr>
  );
}

export default TableRow;
