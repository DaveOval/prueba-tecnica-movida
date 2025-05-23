export const Dashboard = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </div>
  );
};
