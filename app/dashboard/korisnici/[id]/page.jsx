// DashboardNewUser.js
import "@/styles/DashboardItem.scss";
import DashboardNewUserForm from "@/components/dashboard/user/DashboardNewUserForm";
import prisma from "@/utils/db";

export default async function DashboardNewUser({ params }) {
  const { id } = params;

  const item = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <div className="dashboard-item">
      <div className="dashboard-item-edit">
        <DashboardNewUserForm user={item} />
      </div>
    </div>
  );
}
