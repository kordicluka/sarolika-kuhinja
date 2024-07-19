import prisma from "@/utils/db";
import ItemsTable from "../ItemsTable";
import { formatDate } from "@/utils/formatDate";
import DeleteNewsletterUserButton from "./DeleteNewsletterUserButton";

export default async function NewsletterUsersTable() {
  // Fetch the workshop and its applicants
  const newsletterUsers = await prisma.NewsletterUsers.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!newsletterUsers) {
    return <div></div>;
  }

  const tableStructure = {
    columns: [
      {
        title: "Ime",
        width: "20%",
        getJSX: (index) => <span>{newsletterUsers[index].name}</span>,
      },
      {
        title: "Email",
        width: "65%",
        getJSX: (index) => <span>{newsletterUsers[index].email || "N/A"}</span>,
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
                href={`/dashboard/radionice/${id}/prijave/${newsletterUsers[index].id}`}
              >
                Uredi
              </a>
              <DeleteNewsletterUserButton
                id={newsletterUsers[index].id}
                title={newsletterUsers[index].name}
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
          <h4>Newsletter</h4>
          <p className="date">
            Možete pregledati sve korisnike koji su se prijavili na newsletter.
          </p>
        </div>
        <div className="items-header-right"></div>
      </div>
      <div className="items-table-container">
        <ItemsTable items={newsletterUsers} tableStructure={tableStructure} />
      </div>
    </>
  );
}
