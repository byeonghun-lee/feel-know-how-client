import React from "react";
import { useParams } from "react-router-dom";
import AddCardBtn from "components/addCardBtn/AddCardBtn";
import CardComponent from "components/cardComponent/CardComponent";

import "./Drawer.scss";

const Drawer = () => {
    const { drawerName } = useParams();

    return (
        <>
            <h2>{drawerName}</h2>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <AddCardBtn />
        </>
    );
};

export default Drawer;
