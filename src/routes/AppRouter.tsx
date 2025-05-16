import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ProtectedRoute, PublicRoute } from "./";
import { publicRoutes, protectedRoutes, errorRoute } from "./routes";

export const AppRouter = () => (
    <Router>
        <Routes>
            {/* Public Routes */}
            {publicRoutes.map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={<PublicRoute>{element}</PublicRoute>}
                />
            ))}

            {/* Protected Routes */}
            {protectedRoutes.map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <ProtectedRoute>
                            <Layout>{element}</Layout>
                        </ProtectedRoute>
                    }
                />
            ))}

            {/* Error 404 */}
            <Route path={errorRoute.path} element={errorRoute.element} />
        </Routes>
    </Router>
);