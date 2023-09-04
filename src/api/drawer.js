import client from "./client";

export const createDrawer = (drawerObj) => client.post("/drawers", drawerObj);
export const getDrawer = () => client.get("/drawers");
export const getDrawerOfPublicBest = ({ skip }) =>
    client.get(`/drawers/public?skip=${skip}`);
export const updateDrawer = ({ drawerId, drawerObj }) =>
    client.patch(`/drawers/${drawerId}`, drawerObj);
export const removeDrawer = (drawerId) => client.delete(`/drawers/${drawerId}`);
