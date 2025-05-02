import { useEffect } from "react";
import { ListLayout } from "../components/layout/ListLayout";
import { useGetStock } from "../hooks/useGetStock";
import { Spinner } from "../components/common";

export const Stock = () => {
  const { products, isLoading, getProductsList, error } = useGetStock();

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && !error && (!products || products.length === 0)) {
    return (
      <ListLayout title="Stock">
        <div className="text-center text-gray-500 py-8">
          <img src="/empty.svg" alt="Sin productos" className="w-20 h-20 mx-auto mb-4" />
          <p className="text-lg font-medium">No hay productos registrados.</p>
        </div>
      </ListLayout>
    );
  }

  return (
    <ListLayout title="Gestionar Stock">
      <div className="space-y-4">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300">
            {error}
          </div>
        )}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Paquete
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Registro
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.SKU}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${product.stock > 50 ? 'text-green-600' : product.stock > 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {product.stock} unidades
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.package_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.provider}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(product.registration_date).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ListLayout>
  );
};