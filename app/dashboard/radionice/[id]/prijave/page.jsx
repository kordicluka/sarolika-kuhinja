import WorkshopApplicantsTable from "@/components/applicants/ApplicantsTable";

export default function DashboardWorkshopApplicantsPage({ params }) {
  const { id } = params;
  return (
    <div className="items">
      <WorkshopApplicantsTable id={id} />
    </div>
  );
}
