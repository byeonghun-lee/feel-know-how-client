import client from "./client";

export const createCard = (cardObj) => client.post("/cards", cardObj);
export const getCard = ({ nickname, drawerName }) =>
    client.get(`/cards?nickname=${nickname}&drawername=${drawerName}`);
export const getTempCard = ({ name }) => client.get(`/cards/temp?name=${name}`);
export const updateCardReadStatus = (cardId) =>
    client.patch(`/cards/${cardId}/read-status`);
