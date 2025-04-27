import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 ml-64 min-h-screen">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

