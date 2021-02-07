import React from "react";
import { Switch, Route } from "react-router-dom";

export default () => (
    <Switch>
        <Route path="/@:nickName">
            <h2>test</h2>
        </Route>
        {/* <Route path="/in-box" />
        <Route path="/trash" />
        <Route path="/setting" /> */}
    </Switch>
);
