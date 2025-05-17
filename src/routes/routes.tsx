import {
  Dashboard,
  Products,
  Stock,
  Warehouses,
  Error404,
  AddWarehouses,
  Login,
  Signin,
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
  {
    path: '/signup',
    element: <Signin />,
    isPublic: true,
  },
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
    path: '/products',
    element: <Products />,
  },
  {
    path: '/stock',
    element: <Stock />,
  },
  {
    path: '/warehouses',
    element: <Warehouses />,
  },
  {
    path: '/add-warehouses',
    element: <AddWarehouses />,
  },
];

export const errorRoute: RouteConfig = {
  path: '*',
  element: <Error404 />,
};
