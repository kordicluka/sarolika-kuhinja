import DashboardHeader from "@/components/dashboard/header/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
