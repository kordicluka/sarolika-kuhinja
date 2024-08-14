import DashboardPageNavigation from "@/components/dashboard/DashboardPageNavigation";
import "@/styles/DashboardPage.scss";

export default function DashboardMealsLayout({ children }) {
  return (
    <>
      {" "}
      <main className="dashboard-page">
        {" "}
        <DashboardPageNavigation
          links={[
            {
              href: "/dashboard/jela/",
              title: "Sva jela",
            },
            {
              href: "/dashboard/jela/novo-jelo",
              title: "Dodaj novo jelo",
            },
          ]}
        />
        {children}
      </main>
    </>
  );
}
