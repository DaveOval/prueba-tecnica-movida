import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const menuItems = [
    {
      title: 'Gestionar Stock',
      description: 'Ver y actualizar el inventario de productos',
      icon: '📦',
      path: '/stock',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Gestionar Bodegas',
      description: 'Administrar las ubicaciones de almacenamiento',
      icon: '🏭',
      path: '/warehouses',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Agregar Producto',
      description: 'Registrar nuevos productos en el sistema',
      icon: '➕',
      path: '/products',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sistema de Gestión de Inventario
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Bienvenido al sistema de gestión de inventario. Aquí podrás
          administrar tus productos, bodegas y mantener un control eficiente de
          tu stock.
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block transform transition-all duration-200 hover:scale-105"
          >
            <div
              className={`${item.color} rounded-xl shadow-lg p-6 text-white h-full`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl">{item.icon}</span>
                <h2 className="text-xl font-bold">{item.title}</h2>
              </div>
              <p className="text-white/90">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
