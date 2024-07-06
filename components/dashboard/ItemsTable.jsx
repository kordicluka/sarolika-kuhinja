import "@/styles/ItemsTable.scss";

export default function ItemsTable({ items, tableStructure }) {
  return (
    <div className="items-table">
      <div className="items-table-header">
        {tableStructure.columns.map((column, index) => (
          <div
            className="items-table-header-item"
            style={{ width: `${column.width}` }}
            key={index}
          >
            <span> {column.title} </span>
          </div>
        ))}
      </div>

      {items?.map((item) => (
        <div className="items-table-row" key={item.id}>
          {tableStructure.columns.map((column, index) => (
            <div
              className="items-table-row-item"
              style={{ width: `${column.width}` }}
              key={index}
            >
              {column.getJSX(items.indexOf(item))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
