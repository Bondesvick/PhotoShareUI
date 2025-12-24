import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireRole({ role }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return user.role === role ? <Outlet /> : <Navigate to="/" replace />;
}
