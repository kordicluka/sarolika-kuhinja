// DashboardNewWorkshop.js
import DashboardNewWorkshopForm from "@/components/dashboard/workshop/DashboardNewWorkshopForm";
import "@/styles/DashboardItem.scss";
import prisma from "@/utils/db";

export default async function DashboardNewWorkshop({ params }) {
  const { id } = params;

  const item = await prisma.workshop.findUnique({
    where: {
      id: id,
    },
  });

  // Parse the sections field
  if (item && item.sections) {
    try {
      item.sections = JSON.parse(item.sections);
    } catch (error) {
      console.error("Error parsing sections JSON:", error);
      item.sections = [];
    }
  }

  return (
    <div className="dashboard-item">
      <div className="dashboard-item-edit">
        <DashboardNewWorkshopForm workshop={item} />
      </div>
    </div>
  );
}
