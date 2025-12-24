import { apiFetch } from "./client";

export const getComments = (photoId) =>
    apiFetch(`/api/photos/${photoId}/comments`);

export const addComment = (photoId, body) =>
    apiFetch(`/api/photos/${photoId}/comments`, {
        method: "POST",
        body: JSON.stringify(body)
    });
