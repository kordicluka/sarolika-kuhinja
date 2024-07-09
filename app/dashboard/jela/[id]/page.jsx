// DashboardNewPost.js
import DashboardNewMealForm from "@/components/dashboard/meal/DashboardNewMealForm";
import "@/styles/DashboardItem.scss";
import prisma from "@/utils/db";

export default async function DashboardNewMeal({ params }) {
  const { id } = params;

  let item;

  if (id !== "novo-jelo") {
    item = await prisma.meal.findUnique({
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
  }

  return (
    <div className="dashboard-item">
      <div className="dashboard-item-edit">
        <DashboardNewMealForm meal={item} />
      </div>
    </div>
  );
}
