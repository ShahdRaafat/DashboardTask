function TableHeaderCell({ title }: { title: string }) {
  return (
    <th className="px-4 py-5 text-left text-sm font-bold uppercase tracking-wide text-muted">
      {title}
    </th>
  );
}
function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary/10 text-primary-foreground">
        <TableHeaderCell title="Order ID" />
        <TableHeaderCell title="Customer" />
        <TableHeaderCell title="Category" />
        <TableHeaderCell title="Amount" />
        <TableHeaderCell title="Status" />
        <TableHeaderCell title="Date" />
      </tr>
    </thead>
  );
}

export default TableHeader;
