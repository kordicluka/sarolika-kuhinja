import DashboardPageNavigation from "@/components/dashboard/DashboardPageNavigation";
import "@/styles/DashboardPage.scss";

export default function DashboardSectionTypesLayout({ children }) {
  return (
    <>
      {" "}
      <main className="dashboard-page">
        {" "}
        <DashboardPageNavigation
          links={[
            {
              href: "/dashboard/tipovi-sekcija/",
              title: "Svi tipovi sekcija",
            },
            {
              href: "/dashboard/tipovi-sekcija/novi-tip-sekcije",
              title: "Dodaj novi tip sekcije",
            },
          ]}
        />
        {children}
      </main>
    </>
  );
}
