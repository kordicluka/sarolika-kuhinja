import DashboardPageNavigation from "@/components/dashboard/DashboardPageNavigation";
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
              href: "/dashboard/korisnici/",
              title: "Svi korisnici",
            },
            {
              href: "/dashboard/korisnici/novi-korisnik",
              title: "Dodaj novog korisnika",
            },
          ]}
        />
        {children}
      </main>
    </>
  );
}
