import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-[#FFFEFE] border-r border-gray-200">
      <section>
        <picture>
          <img src="./logo.svg" />
        </picture>
        <h2 className="text-2xl font-bold mb-8">WMS</h2>
      </section>
      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className={`hover:text-gray-400 ${isActive('/dashboard') && 'text-blue-400'}`}
        >
          Inicio
        </Link>
        <Link
          to="/products"
          className={`hover:text-gray-400 ${isActive('/products') && 'text-blue-400'}`}
        >
          Agregar Productos
        </Link>
        <Link
          to="/stock"
          className={`hover:text-gray-400 ${isActive('/stock') && 'text-blue-400'}`}
        >
          Gestión de Stock
        </Link>
        <Link
          to="/warehouses"
          className={`hover:text-gray-400 ${isActive('/warehouses') && 'text-blue-400'}`}
        >
          Bodegas
        </Link>
        <Link
          to="/add-warehouses"
          className={`hover:text-gray-400 ${isActive('/add-warehouses') && 'text-blue-400'}`}
        >
          Agregar Bodegas
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
