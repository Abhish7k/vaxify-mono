import { useState, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import AdminDashboardSecondSection from "@/components/dashboards/admin/second-section/AdminDashboardSecondSection";
import AdminDashboardStatsGrid from "@/components/dashboards/admin/AdminDashboardStatsGrid";
import { adminApi, type AdminStats } from "@/api/admin.api";
import { AdminDashboardSkeleton } from "@/components/skeletons/AdminDashboardSkeleton";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingHospitals, setPendingHospitals] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const [statsData, hospitalsData, activitiesData] = await Promise.all([
        adminApi.getStats(),
        adminApi.getPendingHospitals(),
        adminApi.getActivities(),
      ]);

      setStats(statsData);
      setPendingHospitals(hospitalsData);
      setActivities(activitiesData);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Platform-level overview and system management
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </motion.div>

      {/* stats */}
      <motion.div variants={itemVariants}>
        <AdminDashboardStatsGrid stats={stats} />
      </motion.div>

      {/* middle section */}
      <motion.div variants={itemVariants}>
        <AdminDashboardSecondSection
          pendingHospitals={pendingHospitals}
          activities={activities}
        />
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
