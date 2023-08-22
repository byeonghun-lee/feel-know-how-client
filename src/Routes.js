import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "components/PrivateRoute/PrivateRoute";

import BestMain from "bestMain/BestMain";
import Drawer from "drawer/Drawer";
import NewCard from "newCard/NewCard";
import NewDrawer from "newDrawer/NewDrawer";
import Login from "login/Login";
import SignUp from "signUp/SignUp";
import SettingPage from "settingPage/SettingPage";
import Search from "search/Search";
import DrawerList from "drawerList/DrawerList";
import PrivacyPolicy from "privacyPolicy/PrivacyPolicy";
import HowToUse from "howToUse/HowToUse";
import ReadingList from "readingList/ReadingList";

export default () => (
    <Switch>
        <Route exact path="/">
            <BestMain />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route path="/@:nickname">
            <Switch>
                <Route exact path={`/@:nickname/:drawerName`}>
                    <Drawer />
                </Route>
            </Switch>
        </Route>
        <PrivateRoute exact path="/new-card">
            <NewCard />
        </PrivateRoute>
        <PrivateRoute exact path="/edit-card">
            <NewCard />
        </PrivateRoute>
        <PrivateRoute exact path="/new-drawer">
            <NewDrawer />
        </PrivateRoute>
        <PrivateRoute path="/drawers">
            <DrawerList />
        </PrivateRoute>
        <PrivateRoute path="/read-today">
            <ReadingList />
        </PrivateRoute>
        <PrivateRoute path="/in-box">
            <Drawer />
        </PrivateRoute>
        <PrivateRoute path="/trash" />
        <PrivateRoute path="/setting">
            <SettingPage />
        </PrivateRoute>
        <Route path="/search">
            <Search />
        </Route>
        <Route path="/sign-up">
            <SignUp />
        </Route>
        <Route path="/privacy-policy">
            <PrivacyPolicy />
        </Route>
        <Route path="/how-to-use">
            <HowToUse />
        </Route>
    </Switch>
);
