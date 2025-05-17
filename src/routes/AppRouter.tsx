import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout, AuthLayout } from '../components/layout/';
import { ProtectedRoute, PublicRoute } from './';
import { publicRoutes, protectedRoutes, errorRoute } from './routes';

export const AppRouter = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <AuthLayout>
              <PublicRoute>{element}</PublicRoute>
            </AuthLayout>
          }
        />
      ))}

      {/* Protected Routes */}
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <DashboardLayout>{element}</DashboardLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Error 404 */}
      <Route path={errorRoute.path} element={errorRoute.element} />
    </Routes>
  </Router>
);
