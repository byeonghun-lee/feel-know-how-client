import React from "react";
import { Switch, Route } from "react-router-dom";
import BestMain from "bestMain/BestMain";
import Drawer from "drawer/Drawer";
import NewCard from "newCard/NewCard";
import NewDrawer from "newDrawer/NewDrawer";
import Login from "login/Login";
import SignUp from "signUp/SignUp";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

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
        <PrivateRoute exact path="/new-card">
            <NewCard />
        </PrivateRoute>
        <PrivateRoute exact path="/new-drawer">
            <NewDrawer />
        </PrivateRoute>
        <PrivateRoute path="/in-box">
            <Drawer />
        </PrivateRoute>
        <PrivateRoute path="/trash" />
        <PrivateRoute path="/setting" />
        <Route path="/sign-up">
            <SignUp />
        </Route>
    </Switch>
);
