import PageTitle from "@/components/DashboardPageTitle";
import DeleteButton from "@/components/DeleteButton";
import UsersTableUI from "@/components/UsersTableUI";
import "@/styles/DashboardPage.scss";
import prisma from "@/utils/db";
import NextImage from "next/image";

export default async function page() {
  const items = await prisma.user.findMany();

  const tableStructure = {
    rows: [
      {
        title: "Slika",
        width: "10%",
        getJSX: (index) => {
          // return JSX for image  that will be displayed in the table
          return items[index].image ? (
            <NextImage
              src={items[index].image}
              alt={items[index].name}
              className="items-table-image"
              width={30}
              height={30}
            />
          ) : (
            <span className="items-table-image-placeholder">
              {items[index].name.charAt(0).toUpperCase()}
              {items[index].name.split(" ")[1]
                ? items[index].name.split(" ")[1].charAt(0).toUpperCase()
                : null}
            </span>
          );
        },
      },
      {
        title: "Ime",
        width: "25%",
        getJSX: (index) => {
          // return JSX for name that will be displayed in the table
          return <span>{items[index].name}</span>;
        },
      },
      {
        title: "E-mail",
        width: "45%",
        getJSX: (index) => {
          // return JSX for email that will be displayed in the table
          return <span>{items[index].email}</span>;
        },
      },
      {
        title: "Uloga",
        width: "10%",
        getJSX: (index) => {
          // return JSX for role that will be displayed in the table
          return <span>{items[index].role}</span>;
        },
      },
      {
        title: "Akcije",
        width: "10%",
        getJSX: (index) => {
          // return JSX for actions that will be displayed in the table
          return (
            <div className="items-table-actions-button">
              <div className="items-table-actions-dot"></div>
              <div className="items-table-actions-dot"></div>
              <div className="items-table-actions-dot"></div>

              <div className="items-table-actions-dropdown">
                <a href="/dashboard/auth/edit">Uredi</a>

                <DeleteButton url={`/api/users/${items[index].id}`} />
              </div>
            </div>
          );
        },
      },
    ],
  };

  return (
    <main className="dashboard-page">
      <div className="items">
        <PageTitle
          title="Korisnici"
          description="Pregledajte, Dodajte i uređujte admine i obične korisnike stranice"
        />
        <UsersTableUI items={items} tableStructure={tableStructure} />
      </div>
    </main>
  );
}
