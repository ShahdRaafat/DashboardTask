import DashboardLayout from "@/components/ui/DashboardLayout";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
