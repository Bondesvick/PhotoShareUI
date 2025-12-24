import { apiFetch } from "./client";

export const login = (body) =>
    apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(body) });

export const register = (body) =>
    apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(body) });

export const me = () => apiFetch("/api/auth/me");
