import { motion, type Variants } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  ExternalLink,
  Syringe,
  Clock,
  FileText,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AppointmentStatusBadge from "@/components/appointment/my-appointments/AppointmentStatusBadge";

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function MainSection() {
  const hospital = {
    id: "hosp-1",
    name: "City Health Hospital",
    address: "MG Road, Pune",
    status: "PENDING" as const,
    registeredOn: "2026-01-10",
    workingHours: "9:00 AM – 5:00 PM",
    documentUrl: "https://vaxify-docs.s3.amazonaws.com/test-id-card.pdf",
    vaccines: [
      { name: "Covishield", stock: 120, capacity: 200, trend: "up" },
      { name: "Covaxin", stock: 60, capacity: 150, trend: "down" },
      { name: "Sputnik V", stock: 0, capacity: 100, trend: "none" },
    ],
    staff: {
      name: "Ramesh Kumar",
      email: "ramesh@cityhealth.com",
      phone: "9876543210",
      role: "STAFF",
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6 pb-20 p-4 font-sans"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants} className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hospitals
        </button>
      </motion.div>

      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-8"
      >
        <img
          src="/icons/hospital-2.png"
          alt="Hospital Logo"
          className="h-24 w-24 object-contain"
          draggable={false}
        />
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">
              {hospital.name}
            </h1>
            <AppointmentStatusBadge status={hospital.status} />
          </div>
          <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
            <MapPin className="h-4 w-4" />
            {hospital.address}
          </p>
          <p className="text-sm text-slate-400 mt-1 font-mono">
            ID: {hospital.id}
          </p>
        </div>
      </motion.div>

      {/* Simple Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vaccine Inventory */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Syringe className="h-5 w-5 text-primary" />
                Vaccine Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {hospital.vaccines.map((v) => (
                <div
                  key={v.name}
                  className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">{v.name}</p>
                    <Badge
                      className={`font-medium uppercase text-[8px]   ${
                        v.stock === 0
                          ? "border-destructive/50 bg-destructive/10 text-destructive"
                          : v.stock < v.capacity * 0.2
                            ? "border-amber-600/20 bg-amber-600/10 text-amber-600"
                            : "border-green-600/20 bg-green-600/10 text-green-600"
                      }`}
                    >
                      {v.stock === 0
                        ? "Out of Stock"
                        : v.stock < v.capacity * 0.2
                          ? "Low Stock"
                          : "In Stock"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span
                        className={`text font-black ${v.stock > 0 ? "text-slate-900" : "text-rose-500"}`}
                      >
                        {v.stock}
                      </span>
                      <span className="text-slate-400 font-bold">
                        / {v.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Staff Details */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px]">
                    {hospital.staff.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                Lead Administrator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-slate-700">
                <span className="font-semibold w-20 text-xs text-slate-400 uppercase">
                  Name
                </span>
                <span className="text-sm">{hospital.staff.name}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <span className="font-semibold w-20 text-xs text-slate-400 uppercase">
                  Email
                </span>
                <span className="text-sm">{hospital.staff.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <span className="font-semibold w-20 text-xs text-slate-400 uppercase">
                  Contact
                </span>
                <span className="text-sm">{hospital.staff.phone}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Operational Info */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-400" />
                Operational Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-medium">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Working Hours</span>
                <span>{hospital.workingHours}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date Joined</span>
                <span>{hospital.registeredOn}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Verification */}
        <motion.div variants={itemVariants}>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-400" />
                Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Registration Proof</span>
                <a
                  href={hospital.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 font-semibold"
                >
                  View PDF
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
