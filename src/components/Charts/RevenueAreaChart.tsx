"use client";

import { getMonthlyRevenue } from "@/lib/CalculateOrders";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function RevenueAreaChart() {
  const data = getMonthlyRevenue();
  console.log(data, "data");
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 0,
          bottom: 20,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-primary)"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="var(--color-primary)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-primary)"
          fill="url(#revenueColor)"
          strokeWidth={2}
          animationDuration={800}
        />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RevenueAreaChart;
