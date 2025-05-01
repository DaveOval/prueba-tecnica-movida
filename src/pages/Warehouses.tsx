import { useEffect } from "react";
import { ListLayout } from "../components/layout/ListLayout";
import { useGetWarehouses } from "../hooks/useGetWarehouses";
import { Spinner } from "../components/common";

export const Warehouses = () => {
  const { getWarehouses, isLoading, warehouses, error } = useGetWarehouses();

  useEffect(() => {
    getWarehouses();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && !error && warehouses.length === 0) {
    return <p>No hay bodegas registradas.</p>;
  }

  return (
    <ListLayout title="Bodegas">
      <div className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        {warehouses.map((warehouse, index) => (
          <div key={index} className="border p-4 rounded shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{warehouse.name}</h3>
            <p className="text-sm text-gray-600">{warehouse.location}</p>
            <p className="text-sm text-gray-800 mt-1">{warehouse.description}</p>
          </div>
        ))}
      </div>
    </ListLayout>
  );
};
