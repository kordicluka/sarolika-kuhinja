import "@/styles/DashboardHeader.scss";
import DashboardNavbar from "./DashboardNavbar";
import DashboardHeaderDropdowns from "./DashboardHeaderDropdowns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardHeaderUser from "./DashboardHeaderUser";
import Link from "next/link";

export default async function DashboardHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header className="dashboard-header">
      <section className="top-bar">
        <DashboardHeaderDropdowns />
        <div className="time-and-made-by">
          <div className="made-by">
            <p>Created by: </p>
            <Link href="https://msk.hr/" target="_blank" rel="noreferrer">
              msk.hr
            </Link>
          </div>
        </div>
      </section>
      <section className="dashboard-header-header">
        <div className="header-left">
          <div className="header-left-page-info">
            {" "}
            <h3>Šarolika Kuhinja</h3>
            <p>Admin aplikacija</p>
          </div>
        </div>
        <div className="header-right">
          <DashboardHeaderUser session={session} />
        </div>
      </section>
      <DashboardNavbar />
    </header>
  );
}
