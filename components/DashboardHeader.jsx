import "@/styles/DashboardHeader.scss";
import DashboardNavbar from "./DashboardNavbar";
import DashboardHeaderDropdowns from "./DashboardHeaderDropdowns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardHeaderUser from "./DashboardHeaderUser";

export default async function DashboardHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header>
      <section className="top-bar">
        <DashboardHeaderDropdowns />
        <div className="time-and-made-by">
          <div className="made-by">
            <p>Created by: </p>
            <a href="https://msk.hr/">msk.hr</a>
          </div>
        </div>
      </section>
      <section className="header">
        <div className="header-left">
          <div className="header-left-page-info">
            {" "}
            <h3>Šarolika Kuhinja</h3>
            <p>Admin aplikacija</p>
          </div>
          <div className="search">
            <input type="text" placeholder="Pretraži..." />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
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
