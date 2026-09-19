import CategoryBarChart from "@/components/Charts/CategoryBarChart";
import ChartCard from "@/components/Charts/ChartCard";
import RevenueAreaChart from "@/components/Charts/RevenueAreaChart";
import StatusPieChart from "@/components/Charts/StatusPieChart";

function OverviewPage() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ChartCard title="Orders by Status">
        <StatusPieChart />
      </ChartCard>
      <ChartCard title="Sales by Category">
        <CategoryBarChart />
      </ChartCard>
      <div className="lg:col-span-2">
        <ChartCard title="Monthly Revenue">
          <RevenueAreaChart />
        </ChartCard>
      </div>
    </div>
  );
}
export default OverviewPage;
