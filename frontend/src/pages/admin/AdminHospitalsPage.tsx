import AdminHospitalsHeaderSection from "@/components/admin/hospitals-page/AdminHospitalsHeaderSection";
import AdminHospitalsListSection from "@/components/admin/hospitals-page/AdminHospitalsListSection";

import { hospitalApi } from "@/api/hospital.api";
import { useEffect, useState } from "react";

import type {
  AdminHospital,
  HospitalStatus,
} from "@/components/admin/hospitals-page/types";
import AdminHospitalsTabsSection from "@/components/admin/hospitals-page/AdminHospitalsTabsSection";
import { toast } from "sonner";

const AdminHospitalsPage = () => {
  const [activeStatus, setActiveStatus] = useState<HospitalStatus>("PENDING");
  const [hospitals, setHospitals] = useState<AdminHospital[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async () => {
    setLoading(true);

    try {
      const data = await hospitalApi.getAdminHospitals();
      setHospitals(data);
    } catch (error) {
      toast.error("Failed to load hospitals", {
        style: {
          backgroundColor: "#ffe5e5",
          color: "#b00000",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleApproveHospital = async (hospital: AdminHospital) => {
    try {
      await hospitalApi.approveHospital(hospital.id);
      toast.success("Approved hospital successfully", {
        style: {
          backgroundColor: "#e7f9ed",
          color: "#0f7a28",
        },
      });

      fetchHospitals(); // refresh
    } catch (error) {
      toast.error("Failed to approve hospital", {
        style: {
          backgroundColor: "#ffe5e5",
          color: "#b00000",
        },
      });
    }
  };

  const handleRejectHospital = async (hospital: AdminHospital) => {
    try {
      await hospitalApi.rejectHospital(hospital.id);

      toast.success("Rejected hospital successfully", {
        style: {
          backgroundColor: "#e7f9ed",
          color: "#0f7a28",
        },
      });

      fetchHospitals(); // refresh
    } catch (error) {
      toast.error("Failed to reject hospital", {
        style: {
          backgroundColor: "#ffe5e5",
          color: "#b00000",
        },
      });
    }
  };

  return (
    <div className="px-5 py-5 flex flex-col gap-10">
      {/* header */}
      <AdminHospitalsHeaderSection />

      {/* tabs */}
      <AdminHospitalsTabsSection
        value={activeStatus}
        onChange={setActiveStatus}
      />

      {/* list */}
      <AdminHospitalsListSection
        hospitals={hospitals}
        activeStatus={activeStatus}
        isLoading={loading}
        onApproveHospital={handleApproveHospital}
        onRejectHospital={handleRejectHospital}
      />
    </div>
  );
};

export default AdminHospitalsPage;
