import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Fondo oscuro solo en mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-gray-800 text-white p-4 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <h2 className="text-2xl font-bold mb-8">WMS</h2>
        <nav className="flex flex-col gap-4">
          <Link onClick={closeSidebar} to="/dashboard" className={`hover:text-gray-400 ${isActive('/dashboard') && 'text-blue-400'}`}>
            Inicio
          </Link>
          <Link onClick={closeSidebar} to="/products" className={`hover:text-gray-400 ${isActive('/products') && 'text-blue-400'}`}>
            Agregar Productos
          </Link>
          <Link onClick={closeSidebar} to="/stock" className={`hover:text-gray-400 ${isActive('/stock') && 'text-blue-400'}`}>
            Gestión de Stock
          </Link>
          <Link onClick={closeSidebar} to="/warehouses" className={`hover:text-gray-400 ${isActive('/warehouses') && 'text-blue-400'}`}>
            Bodegas
          </Link>
          <Link onClick={closeSidebar} to="/add-warehouses" className={`hover:text-gray-400 ${isActive('/add-warehouses') && 'text-blue-400'}`}>
            Agregar Bodegas
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
