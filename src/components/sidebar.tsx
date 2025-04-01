import server from "@/assets/server.svg";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Heading } from "./ui/Typography";

const Sidebar = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        className="fixed top-4 left-4 z-50 md:hidden"
        variant="secondary"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div className="w-0 md:w-40 bg-sidebar">
        <div className="w-40 fixed h-screen z-40">
          <div
            className={cn(
              "space-y-4 flex flex-col top-0 left-0 h-screen w-40 bg-sidebar p-5 shadow-lg transform transition-transform duration-300 z-40 md:translate-x-0 md:relative",
              {
                "translate-x-0": isOpen,
                "-translate-x-full": !isOpen,
              }
            )}
          >
            <img
              src={server}
              alt="Login Background"
              className="w-full h-auto"
            />
            <Heading.H2 className="text-foreground mx-auto">
              CyberServ
            </Heading.H2>

            <nav className="flex-1 flex flex-col justify-between h-full">
              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full justify-start"
                  variant="secondary"
                >
                  <Link to="/dashboard">Home</Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant="secondary"
                >
                  <Link to="/servers">Servers</Link>
                </Button>
              </div>

              <Button
                className="w-full justify-start"
                variant="destructive-outline"
                onClick={logout}
              >
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
