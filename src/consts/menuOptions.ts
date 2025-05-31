import {
  IconLayoutDashboard,
  IconSettings,
  IconBell,
  IconScanBarcode,
  IconMapPin,
  IconPackageSearch,
  IconUpload,
  IconFileText,
  IconProducts,
  IconWarehouse,
  IconDelete,
  IconStock,
} from '../assets/icons';

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const menuOptions: MenuSection[] = [
  {
    title: 'Dashboard',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: IconLayoutDashboard,
      },
    ],
  },

  // Stock
  {
    title: 'Gestión de stock',
    items: [
      {
        label: 'Agregar stock',
        path: '/stock/agregar',
        icon: IconDelete,
      },
    ],
  },
  {
    title: 'Gestión de Inventario',
    items: [
      {
        label: 'Productos',
        path: '/productos',
        icon: IconProducts,
      },
      {
        label: 'Almacenes',
        path: '/almacenes',
        icon: IconWarehouse,
      },
      {
        label: 'Control Stock',
        path: '/stock',
        icon: IconStock,
      },
      {
        label: 'Alertas',
        path: '/inventario/alertas',
        icon: IconBell,
      },
      {
        label: 'Escanear productos',
        path: '/inventario/escanear',
        icon: IconScanBarcode,
      },
      {
        label: 'Ubicaciones',
        path: '/inventario/ubicaciones',
        icon: IconMapPin,
      },
    ],
  },
  {
    title: 'Configuración',
    items: [
      {
        label: 'Configuración',
        path: '/configuracion',
        icon: IconSettings,
      },
    ],
  },
  {
    title: 'Operaciones de Almacén',
    items: [
      {
        label: 'Pedidos y Picking',
        path: '/almacen/pedidos',
        icon: IconPackageSearch,
      },
      {
        label: 'Recepción',
        path: '/almacen/recepcion',
        icon: IconWarehouse,
      },
      {
        label: 'Carga de archivos',
        path: '/almacen/carga-archivos',
        icon: IconUpload,
      },
    ],
  },
  {
    title: 'Facturación',
    items: [
      {
        label: 'Facturación',
        path: '/facturacion',
        icon: IconFileText,
      },
    ],
  },
];
