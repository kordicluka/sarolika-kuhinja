import NextImage from "next/image";
import ItemsTable from "./ItemsTable";
import DeleteSectionTypeButton from "./DeleteSectionTypeButton";
import prisma from "@/utils/db";

export default async function SectionTypesTable() {
  const items = await prisma.sectionType.findMany();

  const tableStructure = {
    columns: [
      {
        title: "Slika",
        width: "20%",
        getJSX: (index) =>
          items[index].image ? (
            <NextImage
              src={"/uploads/" + items[index].image}
              alt={items[index].name}
              className="items-table-image"
              width={200}
              height={200}
            />
          ) : (
            <span className="items-table-image-placeholder">
              {items[index].name.charAt(0).toUpperCase()}
              {items[index].name.split(" ")[1]
                ? items[index].name.split(" ")[1].charAt(0).toUpperCase()
                : null}
            </span>
          ),
      },
      {
        title: "Ime",
        width: "70%",
        getJSX: (index) => <span>{items[index].name}</span>,
      },
      {
        title: "Akcije",
        width: "10%",
        getJSX: (index) => (
          <div className="items-table-actions-button">
            <div className="items-table-actions-dot"></div>
            <div className="items-table-actions-dot"></div>
            <div className="items-table-actions-dot"></div>

            <div className="items-table-actions-dropdown">
              <a href={`/dashboard/auth/${items[index].id}`}> Uredi </a>
              <DeleteUserButton id={items[index].id} />
            </div>
          </div>
        ),
      },
    ],
  };

  return <ItemsTable items={items} tableStructure={tableStructure} />;
}
