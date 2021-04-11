import React from "react";
import { Switch, Route } from "react-router-dom";
import BestMain from "bestMain/BestMain";
import Drawer from "drawer/Drawer";
import NewCard from "newCard/NewCard";
import NewDrawer from "newDrawer/NewDrawer";
import Login from "login/Login";
import SignUp from "signUp/SignUp";

export default () => (
    <Switch>
        <Route exact path="/">
            <BestMain />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route path="/@:nickName">
            <Switch>
                <Route exact path={`/@:nickName/:drawerName`}>
                    <Drawer />
                </Route>
            </Switch>
        </Route>
        <Route exact path="/new-card">
            <NewCard />
        </Route>
        <Route exact path="/new-drawer">
            <NewDrawer />
        </Route>
        <Route path="/in-box">
            <Drawer />
        </Route>
        <Route path="/trash" />
        <Route path="/setting" />
        <Route path="/sign-up">
            <SignUp />
        </Route>
    </Switch>
);
