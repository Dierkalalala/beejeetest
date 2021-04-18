import {useSelector} from "react-redux";
import {IStoreState} from "../../store/types";
import {Redirect, Route} from "react-router-dom";
import React from "react";

type PrivateRouteArgs = {
    path: string,
    exact?: boolean,
    key: string,
    component: React.ComponentType,
};
export default function PrivateRoute({path, exact, key, component}: PrivateRouteArgs) {
    const userData = useSelector((state: IStoreState) => state.tasks.jwt);
    const isAuth = userData !== '';

    if (isAuth) {
        return (
            <Route
                path={path}
                exact={exact}
                key={key}
                component={component}
            />
        );
    }

    return (

        <Redirect
            to={'/login'}
        >
        </Redirect>
    );
}
