/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableLayout } from '../../components/layout/';
import { Table, Column } from '../../components/common/';
import { useGetProducts } from '../../hooks/products/useGetProducts';
import { useEffect } from 'react';

interface Product {
  name: string;
  category: string;
  unit_of_measure: string;
  barcode: string;
  min_stock_level: number;
  max_stock_level: number;
  price: { $numberDecimal: string };
  status: string;
  created_at: string;
  delete?: never;
  edit?: never;
}

const columns: Column<Product>[] = [
  { key: 'name', header: 'Nombre' },
  { key: 'category', header: 'Categoría' },
  { key: 'unit_of_measure', header: 'Unidad' },
  { key: 'barcode', header: 'Código de barras' },
  { key: 'min_stock_level', header: 'Stock Min.' },
  { key: 'max_stock_level', header: 'Stock Max.' },
  {
    key: 'price',
    header: 'Precio',
    render: (val: any) => `$${val.$numberDecimal}`,
  },
  {
    key: 'status',
    header: 'Estado',
    render: (val: any) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          val === 'Activo'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {val}
      </span>
    ),
  },
  {
    key: 'created_at',
    header: 'Creado',
    render: (val: any) => new Date(val).toLocaleDateString(),
  },
  {
    key: 'delete',
    header: "Borrar"
  },
  {
    key: "edit",
    header: "Editar"
  }
];

export const ListProducts = () => {
  const { isLoading, error, getProductsAction, products } = useGetProducts();

  useEffect(() => {
    getProductsAction();
  }, [getProductsAction]);

  return (
    <TableLayout title="Productos">
      {products?.productos && <Table columns={columns} data={products.productos} />}
      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}
    </TableLayout>
  );
};
