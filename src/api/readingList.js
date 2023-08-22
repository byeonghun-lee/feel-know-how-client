import client from "./client";

export const createReadingItem = (itemObj) =>
    client.post("/reading-lists", itemObj);
export const getReadingList = () => client.get("/reading-lists");
