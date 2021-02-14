import React from "react";
import { Switch, Route } from "react-router-dom";
import BestMain from "bestMain/BestMain";
import Drawer from "drawer/Drawer";
import NewCard from "newCard/NewCard";

export default () => (
    <Switch>
        <Route exact path="/">
            <BestMain />
        </Route>
        <Route path="/@:nickName">
            <Switch>
                <Route exact path={`/@:nickName/new-card`}>
                    <NewCard />
                </Route>
                <Route exact path={`/@:nickName/:drawerName`}>
                    <Drawer />
                </Route>
            </Switch>
        </Route>
        <Route path="/in-box" />
        <Route path="/trash" />
        <Route path="/setting" />
    </Switch>
);
