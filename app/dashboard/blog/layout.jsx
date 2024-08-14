import DashboardPageNavigation from "@/components/dashboard/DashboardPageNavigation";
import "@/styles/DashboardPage.scss";

export default function DashboardPostsLayout({ children }) {
  return (
    <>
      {" "}
      <main className="dashboard-page">
        {" "}
        <DashboardPageNavigation
          links={[
            {
              href: "/dashboard/blog/",
              title: "Sve objave",
            },
            {
              href: "/dashboard/blog/nova-objava",
              title: "Dodaj novu objavu",
            },
          ]}
        />
        {children}
      </main>
    </>
  );
}
