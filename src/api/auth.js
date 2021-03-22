import client from "./client";

console.log("client:", client.defaults);
export const login = ({ id, password }) =>
    client.post("/auth/login", { id, password }, { withCredentials: true });

export const checkLogin = () => client.get("/auth/check");
