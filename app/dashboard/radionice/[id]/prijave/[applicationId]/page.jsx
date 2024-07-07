import DashboardNewApplicantForm from "@/components/applicants/DashboardNewApplicantForm";
import prisma from "@/utils/db";

export default async function DashboardNewWorkshop({ params }) {
  const { applicationId, id } = params;

  const item = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  return (
    <div className="dashboard-item">
      <div className="dashboard-item-edit">
        <DashboardNewApplicantForm application={item} workshopID={id} />
      </div>
    </div>
  );
}
