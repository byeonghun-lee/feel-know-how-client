import client from "./client";

export const createDrawer = (drawerObj) => client.post("/drawer", drawerObj);
export const getDrawer = () => client.get("/drawer");
