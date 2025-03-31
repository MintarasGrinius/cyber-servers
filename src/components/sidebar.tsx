import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="w-48 h-screen relative">
      <div className="h-full fixed p-5 bg-card flex flex-col w-48">
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

        <nav className="flex-1 flex flex-col justify-between h-auto">
          <div className="space-y-2">
            <Button asChild className="w-full" variant="secondary">
              <Link to="/dashboard">Home</Link>
            </Button>
            <Button asChild className="w-full" variant="secondary">
              <Link to="/servers">Servers</Link>
            </Button>
          </div>
          <Button
            className="w-full"
            variant="destructive-outline"
            onClick={logout}
          >
            Logout
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
