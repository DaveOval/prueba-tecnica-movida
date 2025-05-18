import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { nameApp } from '../../config';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const isAsideOpen = useAppSelector((state) => state.ui.isAsideOpen);

  return (
    <aside
      className={`${isAsideOpen ? 'w-64' : 'w-20'} bg-[#FFFEFE] border-r border-gray-200 overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <section
        className={`flex flex-row items-center py-7 gap-1 ${!isAsideOpen && 'justify-center'}`}
      >
        <picture>
          <img src="./logo.svg" className="w-13 h-13" />
        </picture>
        {isAsideOpen && <h2 className="text-2xl font-semibold">{nameApp}</h2>}
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
