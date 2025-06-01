import {
  Dashboard,
  Error404,
  Login,
  //Signin,
  Configuracion,
  ControlStock,
  Alertas,
  EscanearProductos,
  Ubicaciones,
  PedidosPicking,
  Recepcion,
  CargaArchivos,
  Facturacion,
} from '../pages';
import { EditProduct, ListProducts, AddProduct } from '../pages/products';
import { AddStock, EditStock, ListStock } from '../pages/stock';
import { AddWarehouse, EditWarehouse, ListWarehouse } from '../pages/warehouse';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  isPublic?: boolean;
}

export const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: <Login />,
    isPublic: true,
  },
  /* {
    path: '/signup',
    element: <Signin />,
    isPublic: true,
  }, */
];

export const protectedRoutes: RouteConfig[] = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  // Products
  {
    path: '/productos',
    element: <ListProducts />,
  },
  {
    path: '/productos/agregar',
    element: <AddProduct />,
  },
  {
    path: '/productos/editar/:id',
    element: <EditProduct />,
  },
  // Warehouses
  {
    path: '/almacenes',
    element: <ListWarehouse />,
  },
  {
    path: '/almacenes/agregar',
    element: <AddWarehouse />,
  },
  {
    path: '/almacenes/editar/:id',
    element: <EditWarehouse />,
  },
  // stock
  {
    path: '/stock',
    element: <ListStock />,
  },
  {
    path: '/stock/agregar',
    element: <AddStock />,
  },
  {
    path: '/stock/editar/:id',
    element: <EditStock />,
  },
  {
    path: '/configuracion',
    element: <Configuracion />,
  },
  {
    path: '/inventario/stock',
    element: <ControlStock />,
  },
  {
    path: '/inventario/alertas',
    element: <Alertas />,
  },
  {
    path: '/inventario/escanear',
    element: <EscanearProductos />,
  },
  {
    path: '/inventario/ubicaciones',
    element: <Ubicaciones />,
  },
  {
    path: '/almacen/pedidos',
    element: <PedidosPicking />,
  },
  {
    path: '/almacen/recepcion',
    element: <Recepcion />,
  },
  {
    path: '/almacen/carga-archivos',
    element: <CargaArchivos />,
  },
  {
    path: '/facturacion',
    element: <Facturacion />,
  },
];

export const errorRoute: RouteConfig = {
  path: '*',
  element: <Error404 />,
};
