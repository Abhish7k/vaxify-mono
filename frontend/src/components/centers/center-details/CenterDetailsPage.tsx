import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { type CenterData } from "./types";

import CenterDetailsHeaderSection from "./CenterDetailsHeaderSection";
import CenterDetailsVaccinesSection from "./CenterDetailsVaccinesSection";
import CenterDetailsInfoSection from "./CenterDetailsInfoSection";
import CenterDetailsOperatingInfoSection from "./CenterDetailsOperatingInfoSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { hospitalApi } from "@/api/hospital.api";
import CenterNotFound from "./CenterNotFound";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CenterDetailsPage = () => {
  const { centerId } = useParams();
  const [center, setCenter] = useState<CenterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenterDetails = async () => {
      if (!centerId) return;
      try {
        setLoading(true);
        const data = await hospitalApi.getHospitalById(centerId);
        if (data) {
          // map api res to center data
          const mappedData: CenterData = {
            id: String(data.id),
            name: data.name,
            address: data.address,
            phone: (data as any).staffPhone || "N/A",
            email: (data as any).staffEmail || "N/A",
            operatingHours: {
              weekdays: "9:00 AM - 6:00 PM", // Hardcoded for now, could be in DB
            },
            vaccines: (data.vaccines || []).map((v: any) => ({
              name: v.name,
              available: v.stock > 0,
              price: "Free", // Adjust if needed
            })),
            description: `${data.name} is a verified vaccination facility located in ${data.address}.`,
            features: [
              "Digital vaccination certificates",
              "Experienced medical staff",
              "Wheelchair accessible",
            ],
            availableSlots: 24, // Could be dynamic
          };
          setCenter(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch center details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterDetails();
  }, [centerId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!center) {
    return <CenterNotFound />;
  }

  return (
    <div className="min-h-screen">
      <motion.div
        className="max-w-6xl mx-auto px-8 py-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* back btn */}
        <motion.div className="mb-6" variants={itemVariants}>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-all duration-300" />
            Back to Centers
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <CenterDetailsHeaderSection center={center} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={itemVariants}>
              <CenterDetailsVaccinesSection center={center} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <CenterDetailsInfoSection center={center} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <CenterDetailsOperatingInfoSection center={center} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CenterDetailsPage;
