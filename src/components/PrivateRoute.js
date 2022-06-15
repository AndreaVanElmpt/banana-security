import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function PrivateRoute({ children, ...rest}) {
    const { isAuth } = useContext(AuthContext);

    return (
        <Route {...rest} >
            {isAuth ? children : <Redirect to='/' />}
        </Route>
    );
}

export default PrivateRoute;