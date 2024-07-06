import WorkshopApplicantsTable from "@/components/dashboard/workshop/WorkshopApplicantsTable";

export default function DashboardWorkshopApplicantsPage({ params }) {
  const { id } = params;
  return (
    <div className="items">
      <WorkshopApplicantsTable id={id} />
    </div>
  );
}
