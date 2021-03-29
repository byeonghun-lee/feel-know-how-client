import client from "./client";

export const createDrawer = (drawerObj) => client.post("/drawers", drawerObj);
export const getDrawer = () => client.get("/drawers");
