import NextImage from "next/image";
import ItemsTable from "./ItemsTable";
import DeletePostsButton from "./DeletePostsButton";
import prisma from "@/utils/db";
import ToggleItemVisibility from "./ToggleItemVisibility";

export default async function SectionTypesTable() {
  const items = await prisma.post.findMany();

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
              {items[index].name?.charAt(0).toUpperCase()}
              {items[index].name?.split(" ")[1]
                ? items[index].name?.split(" ")[1].charAt(0).toUpperCase()
                : null}
            </span>
          ),
      },
      {
        title: "Naslov",
        width: "50%",
        getJSX: (index) => <span>{items[index].title}</span>,
      },
      {
        title: "Datum kreiranja",
        width: "10%",
        getJSX: (index) => (
          <span>
            {new Date(items[index].createdAt).toLocaleDateString("hr-HR")}
          </span>
        ),
      },
      {
        title: "Vidljivost",
        width: "10%",
        getJSX: (index) => (
          <ToggleItemVisibility item={items[index]} type="post" />
        ),
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
              <a href={`/dashboard/blog/${items[index].id}`}> Uredi </a>
              <DeletePostsButton id={items[index].id} />
            </div>
          </div>
        ),
      },
    ],
  };

  return <ItemsTable items={items} tableStructure={tableStructure} />;
}
