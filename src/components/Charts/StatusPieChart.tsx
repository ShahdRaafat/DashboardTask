"use client";

import { getStatusBreakdown } from "@/lib/CalculateOrders";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function StatusPieChart() {
  const data = getStatusBreakdown();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          animationDuration={800}
        ></Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
export default StatusPieChart;
