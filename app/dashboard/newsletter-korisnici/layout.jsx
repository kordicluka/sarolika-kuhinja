import DashboardPageNavigation from "@/components/dashboard/DashboardPageNavigation";
import "@/styles/DashboardPage.scss";

export default function DashboardNewsletterUsersLayout({ children }) {
  return (
    <>
      {" "}
      <main className="dashboard-page">{children}</main>
    </>
  );
}
