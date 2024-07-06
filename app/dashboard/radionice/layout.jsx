import DashboardPageNavigation from "@/components/dashboard/DashboardPageNavigation";
import "@/styles/DashboardPage.scss";

export default function DashboardWorkshopsLayout({ children }) {
  return (
    <>
      {" "}
      <main className="dashboard-page">
        {" "}
        <DashboardPageNavigation
          links={[
            {
              href: "/dashboard/radionice/",
              title: "Sve radionice",
            },
            {
              href: "/dashboard/radionice/nova-radionica/",
              title: "Dodaj novu radionicu",
            },
          ]}
        />
        {children}
      </main>
    </>
  );
}
