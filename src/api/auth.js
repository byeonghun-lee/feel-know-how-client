import client from "./client";

export const login = ({ id, password }) =>
    client.post("/auth/login", { id, password });
