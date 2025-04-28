import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useOpenSideBar } from "../../hooks";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isOpen, toggleSidebar, closeSidebar } = useOpenSideBar();

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

      <div className="flex flex-col flex-1 min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="bg-gray-100 flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
