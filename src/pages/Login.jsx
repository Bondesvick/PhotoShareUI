import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    async function submit(e) {
        e.preventDefault();
        setErr("");
        try {
            await login(email, password);
            nav("/");
        } catch (ex) {
            setErr(ex.message || "Login failed");
        }
    }

    return (
        <div className="container">
            <h2>Login</h2>

            <form onSubmit={submit} className="upload-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {err && <p>{err}</p>}
            <p>
                No account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
