/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Route } from "react-router-dom";
import Utils from "../common/utils";

type PropsPrivateRouter = Props & { children: JSX.Element, path: string };

function CPrivateRoute({ children, path, ...rest }: PropsPrivateRouter): JSX.Element {
    const token = Utils.getValueLocalStorage("token")
    const expires = Utils.getValueLocalStorage("expires")
    return (
        <Route
            {...rest}
            path={path}
            // render={(props) => expires > now() ? children : token ? children : 
            //     (
            //         <Redirect
            //             to={{
            //                 pathname: "/login",
            //                 state: { from: props.location }
            //             }}
            //         />
            //     )}
            // render={(props) =>  children}
        />
    );
}

export default CPrivateRoute;