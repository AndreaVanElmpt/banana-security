import React, {createContext, useState} from 'react';
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false)
    const history = useHistory()

    function login (){
        console.log('gebruiker is ingelogd')
        setIsAuth(true)
        history.push('/profile')
    }
    function logout (){
        console.log('gebruiker is uitgelogd')
        setIsAuth(false)
        history.push('/')
    }
    const data = {
       isAuth: isAuth,
       login: login,
       logout: logout,
    }

    return(

        <AuthContext.Provider value={data}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;