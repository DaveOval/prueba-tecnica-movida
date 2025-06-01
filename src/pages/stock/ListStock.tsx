import { TableLayout } from '../../components/layout/TableLayout';
import { Table, Column } from '../../components/common/';
import { useGetStock } from '../../hooks/stock/useGetStock';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
}

interface Stock {
  _id: string;
  product_id: string | null;
  warehouse_id: Warehouse;
  location_code: string;
  batch_number: string;
  expiry_date: string;
  serial_number: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  last_movement_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  delete?: never;
  edit?: never;
}

const EditButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/stock/editar/${id}`)}
      className="text-blue-600 hover:text-blue-800"
    >
      Editar
    </button>
  );
};

const DeleteStock = ({ id }: { id: string }) => {
  const handleDelete = () => {
    if (
      window.confirm(
        '¿Estás seguro de que deseas eliminar este registro de stock?'
      )
    ) {
      // TODO: Implement delete functionality
      console.log('Delete stock:', id);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Eliminar
    </button>
  );
};

const columns: Column<Stock>[] = [
  {
    key: 'warehouse_id',
    header: 'Almacén',
    render: (val) => {
      const warehouse = val as Warehouse;
      return warehouse?.warehouse_name || '-';
    },
  },
  { key: 'location_code', header: 'Código de ubicación' },
  { key: 'batch_number', header: 'Número de lote' },
  { key: 'serial_number', header: 'Número de serie' },
  { key: 'quantity', header: 'Cantidad' },
  { key: 'reserved_quantity', header: 'Cantidad reservada' },
  { key: 'available_quantity', header: 'Cantidad disponible' },
  {
    key: 'expiry_date',
    header: 'Fecha de vencimiento',
    render: (val) => (val ? new Date(val as string).toLocaleDateString() : '-'),
  },
  {
    key: 'last_movement_date',
    header: 'Último movimiento',
    render: (val) => (val ? new Date(val as string).toLocaleDateString() : '-'),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (val) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          val === 'Activo'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {typeof val === 'string' ? val : '-'}
      </span>
    ),
  },
  {
    key: 'created_at',
    header: 'Creado',
    render: (val) => (val ? new Date(val as string).toLocaleDateString() : '-'),
  },
  {
    key: 'delete',
    header: 'Borrar',
    render: (_, row) => <DeleteStock id={row._id} />,
  },
  {
    key: 'edit',
    header: 'Editar',
    render: (_, row) => <EditButton id={row._id} />,
  },
];

export const ListStock = () => {
  const { isLoading, error, getStockAction, stock } = useGetStock();

  useEffect(() => {
    getStockAction();
  }, [getStockAction]);

  return (
    <TableLayout title="Control Stock" route="agregar">
      {stock?.stock && <Table columns={columns} data={stock.stock} />}
      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error}</div>}
    </TableLayout>
  );
};
