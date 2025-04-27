import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Products, Stock, Warehouses, Error404 } from "../pages"
import { Layout } from "../components/layout/Layout";

export const AppRouter = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/warehouses" element={<Warehouses />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Layout>
    </Router>
);