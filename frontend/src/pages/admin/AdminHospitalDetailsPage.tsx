import AdminHospitalFloatingActions from "@/components/admin/hospital-details-page/AdminHospitalActionsSection";
import AdminHospitalDetailsHeaderSection from "@/components/admin/hospital-details-page/AdminHospitalDetailsHeaderSection";
import AdminHospitalMetaSection from "@/components/admin/hospital-details-page/AdminHospitalMetaSection";
import AdminHospitalOperationsSection from "@/components/admin/hospital-details-page/AdminHospitalOperationsSection";
import AdminHospitalOverviewSection from "@/components/admin/hospital-details-page/AdminHospitalOverviewSection";
import AdminHospitalStaffSection from "@/components/admin/hospital-details-page/AdminHospitalStaffSection";
import { mockHospitalDetails } from "@/components/admin/hospital-details-page/mockdata";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminHospitalDetailsPage() {
  const [hospital, setHospital] = useState(mockHospitalDetails);

  const handleApproveHospital = () => {
    setHospital((prev) => ({
      ...prev,
      status: "APPROVED",
    }));

    console.log("Approve:", hospital.id);

    toast.success("Approved hospital successfully", {
      style: {
        backgroundColor: "#e7f9ed",
        color: "#0f7a28",
      },
    });
  };

  const handleRejectHospital = () => {
    setHospital((prev) => ({
      ...prev,
      status: "REJECTED",
    }));

    console.log("Reject:", hospital.id);

    toast.error("Rejected hospital successfully", {
      style: {
        backgroundColor: "#e7f9ed",
        color: "#0f7a28",
      },
    });
  };

  return (
    <div className="px-5 md:px-10 transition-all space-y-10 mb-40">
      {/* header */}
      <AdminHospitalDetailsHeaderSection
        hospitalName={mockHospitalDetails.name}
        status={mockHospitalDetails.status}
      />

      {/* overview */}
      <AdminHospitalOverviewSection
        address={mockHospitalDetails.address}
        name={mockHospitalDetails.name}
      />

      {/* staff */}
      <AdminHospitalStaffSection
        name={mockHospitalDetails.staffName}
        email={mockHospitalDetails.staffEmail}
        phone={mockHospitalDetails.staffPhone}
      />

      {/* operations */}
      <AdminHospitalOperationsSection
        availableVaccines={mockHospitalDetails.availableVaccines}
        workingHours={mockHospitalDetails.workingHours}
      />

      {/* metadata */}
      <AdminHospitalMetaSection
        hospitalId={mockHospitalDetails.id}
        createdAt={mockHospitalDetails.createdAt}
      />

      {/* floating actions */}
      <AdminHospitalFloatingActions
        hospitalName={hospital.name}
        status={hospital.status}
        onApprove={handleApproveHospital}
        onReject={handleRejectHospital}
      />
    </div>
  );
}
