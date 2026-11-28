import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../shared/hooks/useAuth";
import Loading from "../../shared/loading/loading";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
