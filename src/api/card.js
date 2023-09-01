import client from "./client";

export const createCard = (cardObj) => client.post("/cards", cardObj);
export const getCard = ({ nickname, drawerUniqueName }) =>
    client.get(
        `/cards?nickname=${nickname}&draweruniquename=${drawerUniqueName}`
    );
export const getTempCard = ({ name }) => client.get(`/cards/temp?name=${name}`);
export const updateCardReadStatus = (cardId) =>
    client.patch(`/cards/${cardId}/read-status`);
export const updateCard = ({ cardId, cardObj }) =>
    client.patch(`/cards/${cardId}`, cardObj);
