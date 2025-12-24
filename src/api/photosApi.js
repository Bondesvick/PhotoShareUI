import { apiFetch } from "./client";

export const searchPhotos = ({ search, location, page, pageSize }) => {
    const qs = new URLSearchParams({
        ...(search ? { search } : {}),
        ...(location ? { location } : {}),
        page: page ?? 1,
        pageSize: pageSize ?? 20
    });
    return apiFetch(`/api/photos?${qs.toString()}`);
};

export const getPhoto = (id) => apiFetch(`/api/photos/${id}`);

export const createPhoto = (body) =>
    apiFetch("/api/photos", { method: "POST", body: JSON.stringify(body) });
