import DashboardLayout from "@/components/ui/DashboardLayout";
import AuthLoader from "@/features/auth/AuthLoader";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
      {<AuthLoader />}
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
