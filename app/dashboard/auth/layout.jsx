import DashboardPageNavigation from "@/components/DashboardPageNavigation";
import "@/styles/DashboardPage.scss";

export default function DashboardUsersLayout({ children }) {
  return (
    <>
      {" "}
      <main className="dashboard-page">
        {" "}
        <DashboardPageNavigation
          links={[
            {
              href: "/dashboard/auth/",
              title: "Svi korisnici",
            },
            {
              href: "/dashboard/auth/new-user",
              title: "Dodaj novog korisnika",
            },
          ]}
        />
        {children}
      </main>
    </>
  );
}
