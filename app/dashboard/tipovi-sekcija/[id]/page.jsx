// DashboardNewUser.js
import DashboardNewSectionTypeForm from "@/components/dashboard/section-type/DashboardNewSectionTypeForm";
import "@/styles/DashboardItem.scss";
import prisma from "@/utils/db";

export default async function DashboardNewSectionType({ params }) {
  const { id } = params;

  const item = await prisma.sectionType.findUnique({
    where: {
      id: id,
    },
  });

  // parse the item.jsxContent if exists
  if (item) {
    item.jsxContent = JSON.parse(item.jsxContent);
  }

  return (
    <div className="dashboard-item">
      <div className="dashboard-item-edit">
        <DashboardNewSectionTypeForm sectionType={item} />
      </div>
    </div>
  );
}
