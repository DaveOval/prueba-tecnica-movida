import { useEffect } from "react";
import { ListLayout } from "../components/layout/ListLayout"
import { useGetWarehouses } from "../hooks/useGetWarehouses";
export const Warehouses = () => {


  const { warehouses, getWarehouses, isLoading, error } = useGetWarehouses();

  useEffect(() => {
    getWarehouses();
  }, []);

  return (
    <ListLayout title="Bodegas">
      <div className="space-y-4">
        {isLoading && <p>Cargando bodegas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && warehouses.length === 0 && (
          <p>No hay bodegas registradas.</p>
        )}
        {!isLoading && warehouses.map((warehouse, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">{warehouse.name}</h3>
            <p className="text-sm text-gray-600">{warehouse.location}</p>
            <p className="text-sm text-gray-800 mt-1">{warehouse.description}</p>
          </div>
        ))}
      </div>
  </ListLayout>
  )
}
