import client from "./client";

export const createCard = (cardObj) => client.post("/cards", cardObj);
export const getCard = ({ nickName, drawerName }) =>
    client.get(`/cards?nickname=${nickName}&drawername=${drawerName}`);
export const updateCardReadStatus = (cardId) =>
    client.patch(`/cards/${cardId}/read-status`);
