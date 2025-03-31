import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";
import Sidebar from "../components/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { loggedIn } = useAuth();
  console.info("🚀 ~ loggedIn:", loggedIn);
  return (
    <div className="flex">
      {loggedIn && <Sidebar />}
      <div className="flex-1 bg-background">{children}</div>
    </div>
  );
};

export default DashboardLayout;
