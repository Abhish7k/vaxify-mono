import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
