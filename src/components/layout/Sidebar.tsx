import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path : string) => location.pathname === path;

  return (
    <aside className="h-screen bg-gray-800 text-white w-64 p-4 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-8">WMS Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className={`hover:text-gray-400 ${isActive('/dashboard') && 'text-blue-400'}`}>
          Dashboard
        </Link>
        <Link to="/products" className={`hover:text-gray-400 ${isActive('/products') && 'text-blue-400'}`}>
          Ingreso Productos
        </Link>
        <Link to="/stock" className={`hover:text-gray-400 ${isActive('/stock') && 'text-blue-400'}`}>
          Gestión de Stock
        </Link>
        <Link to="/warehouses" className={`hover:text-gray-400 ${isActive('/warehouses') && 'text-blue-400'}`}>
          Bodegas
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
