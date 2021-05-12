import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const { pathname } = useLocation();
    const isLogin = useSelector(({ auth }) => auth.info);

    return (
        <Route
            {...rest}
            render={() =>
                isLogin ? (
                    children
                ) : (
                    <Redirect to={`/login?${pathname.substring(1)}`}></Redirect>
                )
            }
        ></Route>
    );
};

export default PrivateRoute;
