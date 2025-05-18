import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* <aside className="w-64 bg-white border-r"></aside> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Nav */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
