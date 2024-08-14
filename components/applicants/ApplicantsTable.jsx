import prisma from "@/utils/db";
import ItemsTable from "../dashboard/ItemsTable";
import ProgressBar from "../dashboard/ProgressBar";
import { formatDate } from "@/utils/formatDate";
import DeleteApplicationButton from "./DeleteApplicationButton";
import Link from "next/link";

export default async function WorkshopApplicantsTable({ id }) {
  // Fetch the workshop and its applicants
  const workshop = await prisma.workshop.findUnique({
    where: { id },
    include: {
      applications: true,
    },
  });

  if (!workshop) {
    return <div>Radionica nije pronađena</div>;
  }

  const { applications } = workshop;

  const tableStructure = {
    columns: [
      {
        title: "Ime",
        width: "15%",
        getJSX: (index) => <span>{applications[index].name}</span>,
      },
      {
        title: "Prezime",
        width: "15%",
        getJSX: (index) => <span>{applications[index].surname}</span>,
      },
      {
        title: "Ime Djeteta",
        width: "15%",
        getJSX: (index) => <span>{applications[index].childName}</span>,
      },
      {
        title: "Telefon",
        width: "15%",
        getJSX: (index) => <span>{applications[index].telephone}</span>,
      },
      {
        title: "Email",
        width: "15%",
        getJSX: (index) => <span>{applications[index].email || "N/A"}</span>,
      },
      {
        title: "Fotografiranje",
        width: "10%",
        getJSX: (index) => (
          <span>
            {applications[index].photoPermission ? "Dopušteno" : "Nedopušteno"}
          </span>
        ),
      },
      {
        title: "Akcije",
        width: "15%",
        getJSX: (index) => (
          <div className="items-table-actions-button">
            <div className="items-table-actions-dot"></div>
            <div className="items-table-actions-dot"></div>
            <div className="items-table-actions-dot"></div>

            <div className="items-table-actions-dropdown">
              <Link
                href={`/dashboard/radionice/${id}/prijave/${applications[index].id}`}
              >
                Uredi
              </Link>
              <DeleteApplicationButton
                id={applications[index].id}
                title={applications[index].name}
              />
            </div>
          </div>
        ),
      },
    ],
  };

  return (
    <>
      <div className="items-header">
        <div className="items-header-left">
          <span className="back-button">Prijave za radionicu:</span>
          <h4>{workshop.title}</h4>
          <p className="date">{formatDate(workshop.createdAt)}</p>
        </div>
        <div className="items-header-right">
          <div className="progress-bar-container">
            <ProgressBar
              current={applications.length}
              total={workshop.maxApplicant}
            />
            <span className="progress-bar-text">
              {applications.length}/{workshop.maxApplicant}
            </span>
          </div>
        </div>
      </div>
      <div className="items-table-container">
        <ItemsTable items={applications} tableStructure={tableStructure} />
      </div>
    </>
  );
}
