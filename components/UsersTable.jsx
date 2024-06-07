import DeleteButton from "@/components/DeleteButton";
import NextImage from "next/image";
import ItemsTable from "./ItemsTable";
import { getUsers } from "@/app/api/users/route";

export default async function UsersTable() {
  const { users: items } = await getUsers().then((res) => res.json());

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
                <a href={`/dashboard/auth/${items[index].id}`}> Uredi </a>
                <DeleteButton url={`/api/users/${items[index].id}`} />
              </div>
            </div>
          );
        },
      },
    ],
  };
  return <ItemsTable items={items} tableStructure={tableStructure} />;
}
