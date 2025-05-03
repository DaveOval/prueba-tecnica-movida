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
    <div className="flex min-h-screen w-full">
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 w-full overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-full mx-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};
