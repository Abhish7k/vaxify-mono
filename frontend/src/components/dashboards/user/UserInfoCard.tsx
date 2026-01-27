import * as React from "react";
import { motion, type Variants } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  Calendar,
  ClipboardList,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function UserInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      className="w-full max-w-lg mx-auto"
    >
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm",
        )}
      >
        {/* gradient background */}
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, hsl(211,100%,85%) 0%, transparent 65%)",
          }}
        />

        {/* profile icon scales in */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          variants={iconAnimation}
          className="relative z-10 flex justify-center mt-5"
        >
          <img
            src="/icons/profile.png"
            alt="User profile"
            className="h-32 w-32 object-contain"
          />
        </motion.div>

        {/* content slides up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-20 rounded-xl border bg-background/80 p-6 backdrop-blur-sm text-center"
        >
          {/* header */}
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{userStats.name}</h2>
              <Badge className="border border-blue-600/20 bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40">
                {userStats.role}
              </Badge>
            </div>
          </div>

          {/* dynamic info rows */}
          <div className="mt-6 space-y-3 text-sm">
            {/* basic info */}
            {basicInfo.map((item, index) => (
              <InfoRow
                key={index}
                icon={<item.icon className="h-4 w-4" />}
                label={item.label}
                value={item.value}
              />
            ))}

            {/* metadata section */}
            <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
              {metadataInfo.map((item, index) => (
                <InfoRow
                  key={index}
                  icon={<item.icon className="h-4 w-4" />}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}

// hover animation variants
const iconAnimation: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.2,
    y: -20,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

// info row with staggered animation
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <span className="text-xs text-muted-foreground min-w-0 truncate">
        {label}
      </span>
      <span className="font-medium text-right flex-1 min-w-0 truncate">
        {value}
      </span>
    </div>
  );
}

const userStats = {
  userId: "USR-102938",
  joinedDate: "Jan 2026",
  totalAppointments: 5,
  name: "Abhishek",
  email: "abhi@email.com",
  role: "USER",
  phone: "+91-XXXXXXXXXX",
  address: "Pune, IN",
};

const basicInfo = [
  { icon: User, label: "Name", value: userStats.name },
  { icon: Mail, label: "Email", value: userStats.email },
  { icon: Phone, label: "Phone", value: userStats.phone },
  { icon: MapPin, label: "Address", value: userStats.address },
];

const metadataInfo = [
  { icon: Hash, label: "User ID", value: userStats.userId },
  { icon: Calendar, label: "Joined", value: userStats.joinedDate },
  {
    icon: ClipboardList,
    label: "Appointments",
    value: userStats.totalAppointments,
  },
];
