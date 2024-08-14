import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import ToasterProvider from "@/components/dashboard/ToasterProvider";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardHeader />
      {children}
      <ToasterProvider />
    </>
  );
}
