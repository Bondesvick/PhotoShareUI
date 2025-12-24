const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
}

export async function apiFetch(path, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
    }

    return res.status === 204 ? null : res.json();
}
