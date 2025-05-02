import { useEffect } from "react";
import { ListLayout } from "../components/layout/ListLayout";
import { useGetStock } from "../hooks/useGetStock";
import { Spinner } from "../components/common";


export const Stock = () => {

  const { products, isLoading, getProductsList, error } = useGetStock();

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  console.log(products)

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && !error && (!products || products.length === 0)) {
    return (
      <ListLayout title="Bodegas">
        <div className="text-center text-gray-500 py-8">
          <img src="/empty.svg" alt="Sin bodegas" className="w-20 h-20 mx-auto mb-4" />
          <p className="text-lg font-medium">No hay bodegas registradas.</p>
        </div>
      </ListLayout>
    );
  }


  return (
    <ListLayout title="Gestionar Stock">
      <div>Gestionar Stock</div>
    </ListLayout>
  )
}