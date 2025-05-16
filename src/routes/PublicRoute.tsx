import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "../store";

interface Props {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: Props) => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
};