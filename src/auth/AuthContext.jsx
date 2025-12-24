import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setToken, getToken } from "../api/client";
import { login, register, me } from "../api/authApi";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function parseJwt(token) {
    try {
        const payload = token.split(".")[1];
        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // {id,email,displayName,role}

    useEffect(() => {
        const token = getToken();
        if (!token) return;

        // Try backend /me first, fallback to JWT claims
        me().then(setUser).catch(() => {
            const claims = parseJwt(token);
            if (claims) {
                setUser({
                    id: claims.sub,
                    email: claims.email || claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                    displayName: claims.name || claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    role: (claims.role || claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
                });
            } else {
                setToken(null);
            }
        });
    }, []);

    const value = useMemo(() => ({
        user,
        async login(email, password) {
            const data = await login({ email, password });
            setToken(data.token);
            setUser({ id: data.userId, email: data.email, displayName: data.displayName, role: data.role });
        },
        async register(email, displayName, password) {
            const data = await register({ email, displayName, password });
            setToken(data.token);
            setUser({ id: data.userId, email: data.email, displayName: data.displayName, role: data.role });
        },
        logout() {
            setToken(null);
            setUser(null);
        }
    }), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
