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
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
