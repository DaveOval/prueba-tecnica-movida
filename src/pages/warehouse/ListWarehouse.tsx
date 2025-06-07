import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { TableLayout } from '../../components/layout/';
import { Table, Column, Spinner } from '../../components/common/';
import { useGetWarehouses } from '../../hooks/warehouses/useGetWarehouses';
import { useDeleteWarehouse } from '../../hooks/warehouses/useDeleteWarehouse';

interface Warehouse {
  _id: string;
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  __v: number;
  delete?: never;
  edit?: never;
}

const EditButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/almacenes/editar/${id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      Editar
    </button>
  );
};

const DeleteWarehouse = ({ id }: { id: string }) => {
  const { deleteWarehouseAction } = useDeleteWarehouse(() => {
    // Refresh the warehouses list after successful deletion
    window.location.reload();
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este almacén?')) {
      deleteWarehouseAction(id);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Eliminar
    </button>
  );
};

const columns: Column<Warehouse>[] = [
  { key: 'warehouse_name', header: 'Nombre' },
  { key: 'warehouse_code', header: 'Código' },
  { key: 'square_meters', header: 'Metros cuadrados' },
  { key: 'aisle_count', header: 'Número de pasillos' },
  { key: 'racks_per_aisle', header: 'Racks por pasillo' },
  { key: 'levels_per_rack', header: 'Niveles por rack' },
  {
    key: 'Default',
    header: 'Por defecto',
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {value ? 'Sí' : 'No'}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          value === 'Activo'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'created_at',
    header: 'Creado',
    render: (value) => {
      if (typeof value === 'string') {
        return new Date(value).toLocaleDateString();
      }
      return '';
    },
  },
  {
    key: 'delete',
    header: 'Borrar',
    render: (_, row) => <DeleteWarehouse id={row._id} />,
  },
  {
    key: 'edit',
    header: 'Editar',
    render: (_, row) => <EditButton id={row._id} />,
  },
];

export const ListWarehouse = () => {
  const { isLoading, error, getWarehousesAction, warehouses } =
    useGetWarehouses();

  useEffect(() => {
    getWarehousesAction();
  }, [getWarehousesAction]);

  return (
    <TableLayout title="Almacenes" route="agregar">
      {warehouses?.bodegas && (
        <Table columns={columns} data={warehouses.bodegas} />
      )}
      {isLoading && <Spinner />}
      {error && <div>Error: {error}</div>}
    </TableLayout>
  );
};
