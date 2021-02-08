import React from "react";
import { Switch, Route } from "react-router-dom";
import BestMain from "bestMain/BestMain";

export default () => (
    <Switch>
        <Route exact path="/">
            <BestMain />
        </Route>
        <Route path="/@:nickName">
            <h2>test</h2>
        </Route>
        <Route path="/in-box" />
        <Route path="/trash" />
        <Route path="/setting" />
    </Switch>
);
