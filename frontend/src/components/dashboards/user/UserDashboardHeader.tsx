import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function UserDashboardHeader() {
  return (
    <motion.div
      variants={item}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Your vaccination overview
        </p>
      </div>

      <Link to="/centers">
        <Button className="w-full sm:w-auto cursor-pointer active:scale-95 transition-all">
          Book Appointment
        </Button>
      </Link>
    </motion.div>
  );
}
