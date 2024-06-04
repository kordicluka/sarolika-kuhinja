import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
