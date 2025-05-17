import { useEffect } from 'react';
import { ListLayout } from '../components/layout/ListLayout';
import { useGetWarehouses } from '../hooks/useGetWarehouses';
import { Spinner } from '../components/common';

export const Warehouses = () => {
  const { getWarehouses, isLoading, warehouses, error } = useGetWarehouses();

  useEffect(() => {
    getWarehouses();
  }, [getWarehouses]);

  if (isLoading) {
    return <Spinner />;
  }

  if (
    !isLoading &&
    !error &&
    (!warehouses?.bodegas || warehouses.bodegas.length === 0)
  ) {
    return (
      <ListLayout title="Bodegas">
        <div className="text-center text-gray-500 py-8">
          <img
            src="/empty.svg"
            alt="Sin bodegas"
            className="w-20 h-20 mx-auto mb-4"
          />
          <p className="text-lg font-medium">No hay bodegas registradas.</p>
        </div>
      </ListLayout>
    );
  }

  return (
    <ListLayout title="Bodegas">
      <div className="space-y-4">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {warehouses?.bodegas?.map((warehouse) => (
            <div
              key={warehouse._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all border border-gray-100 hover:cursor-pointer hover:bg-gray-50 hover:border-gray-200"
            >
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/warehouse.svg"
                  alt="warehouse"
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center">
                {warehouse.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {warehouse.location}
              </p>
              <p className="text-sm text-gray-700 mt-3">
                {warehouse.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ListLayout>
  );
};
