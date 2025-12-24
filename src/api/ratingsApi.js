import { apiFetch } from "./client";

export const getRatingSummary = (photoId) =>
    apiFetch(`/api/photos/${photoId}/ratings/summary`);

export const addRating = (photoId, body) =>
    apiFetch(`/api/photos/${photoId}/ratings`, {
        method: "POST",
        body: JSON.stringify(body)
    });
