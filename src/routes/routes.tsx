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
