/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableLayout } from '../../components/layout/';
import { Table, Column } from '../../components/common/';
import { useGetProducts } from '../../hooks/products/useGetProducts';
import { useDeleteProduct } from '../../hooks/products/useDeleteProduct';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  _id: string;
  delete?: never;
  edit?: never;
}

const EditButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/productos/editar/${id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      Editar
    </button>
  );
};

const DeleteProduct = ({ id }: { id: string }) => {
  const { deleteProductAction } = useDeleteProduct(() => {
    window.location.reload();
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProductAction(id);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Eliminar
    </button>
  );
};

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
    header: 'Borrar',
    render: (_, row) => <DeleteProduct id={row._id} />,
  },
  {
    key: 'edit',
    header: 'Editar',
    render: (_, row) => <EditButton id={row._id} />,
  },
];

export const ListProducts = () => {
  const { isLoading, error, getProductsAction, products } = useGetProducts();

  useEffect(() => {
    getProductsAction();
  }, [getProductsAction]);

  return (
    <TableLayout title="Productos" route="agregar">
      {products?.productos && (
        <Table columns={columns} data={products.productos} />
      )}
      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}
    </TableLayout>
  );
};
