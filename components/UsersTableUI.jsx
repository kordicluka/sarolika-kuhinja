import "@/styles/ItemsTable.scss";

export default function UsersTableUI({ items, tableStructure }) {
  return (
    <div className="items-table">
      <div className="items-table-header">
        <div
          className="items-table-header-item"
          style={{ width: `${tableStructure.rows[0].width}` }}
        >
          <span> {tableStructure.rows[0].title} </span>
        </div>
        <div
          className="items-table-header-item"
          style={{ width: `${tableStructure.rows[1].width}` }}
        >
          <span> {tableStructure.rows[1].title} </span>
        </div>
        <div
          className="items-table-header-item"
          style={{ width: `${tableStructure.rows[2].width}` }}
        >
          <span> {tableStructure.rows[2].title} </span>
        </div>
        <div
          className="items-table-header-item"
          style={{ width: `${tableStructure.rows[3].width}` }}
        >
          <span> {tableStructure.rows[3].title} </span>
        </div>
        <div
          className="items-table-header-item"
          style={{ width: `${tableStructure.rows[4].width}` }}
        >
          <span> {tableStructure.rows[4].title} </span>
        </div>
      </div>

      {items.map((item) => (
        <div className="items-table-row" key={item.id}>
          <div className="items-table-row-item" style={{ width: "10%" }}>
            {tableStructure.rows[0].getJSX(items.indexOf(item))}
          </div>
          <div className="items-table-row-item" style={{ width: "25%" }}>
            {tableStructure.rows[1].getJSX(items.indexOf(item))}
          </div>
          <div className="items-table-row-item" style={{ width: "45%" }}>
            {tableStructure.rows[2].getJSX(items.indexOf(item))}
          </div>
          <div className="items-table-row-item" style={{ width: "10%" }}>
            {tableStructure.rows[3].getJSX(items.indexOf(item))}
          </div>
          <div className="items-table-row-item" style={{ width: "10%" }}>
            {tableStructure.rows[4].getJSX(items.indexOf(item))}
          </div>
        </div>
      ))}
    </div>
  );
}
