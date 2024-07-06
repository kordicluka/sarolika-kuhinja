import prisma from "@/utils/db";
import ItemsTable from "../ItemsTable";

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
        title: "Alergije Djece",
        width: "15%",
        getJSX: (index) => (
          <span>{applications[index].childAlergies || "N/A"}</span>
        ),
      },
      {
        title: "Dozvola za Fotografiranje",
        width: "10%",
        getJSX: (index) => (
          <span>{applications[index].photoPermission ? "Da" : "Ne"}</span>
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
              <a
                href={`/dashboard/radionice/${id}/prijave/${applications[index].id}`}
              >
                Pregledaj
              </a>
            </div>
          </div>
        ),
      },
    ],
  };

  return <ItemsTable items={applications} tableStructure={tableStructure} />;
}
