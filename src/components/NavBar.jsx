import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="nav">
            <Link to="/" className="logo">PhotoShare</Link>

            <div className="nav-right">
                {user?.role === "Creator" && (
                    <Link to="/creator/upload">Upload</Link>
                )}

                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        <span>Hello, {user.displayName}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
