// DashboardNewUser.js
import DashboardNewSectionTypeForm from "@/components/DashboardNewSectionTypeForm";
import "@/styles/DashboardItem.scss";
import prisma from "@/utils/db";

export default async function DashboardNewSectionType({ params }) {
  const { id } = params;

  const item = await prisma.sectionType.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <div className="dashboard-item">
      <div className="dashboard-item-edit">
        <DashboardNewSectionTypeForm sectionType={item} />
      </div>
    </div>
  );
}
