import React, {createContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
    });

    const history = useHistory()

    function login (token){
        console.log(token);
        const decodedToken =jwt_decode( token );
        console.log(decodedToken)
        getData(decodedToken.sub, token)
        localStorage.setItem('token', token)

        console.log('De gebruiker is ingelogd')
        // toggleAuth(
        // {
        //     isAuth: true,
        //     user: {
        //         username: decodedToken.username,
        //         email: decodedToken.email,
        //         id: decodedToken.sub,
        //       },
        // });
        async function getData(id, token){
            try {
                const data = await axios.get(`http://localhost:3000/600/users/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                toggleAuth({
                    isAuth: true,
                    user: {
                        username: data.data.username,
                        email: data.data.email,
                        id: data.data.id,
                    }
                })
                history.push('/profile')
                console.log(data.data)
            }catch (e) {
                console.error(e)
            }
        }

    }
    function logout (){
        console.log('gebruiker is uitgelogd')
        toggleAuth({
            isAuth: false,
            user: null,
        });

        history.push('/')
    }


    const data = {
       isAuth: auth.isAuth,
        user: auth.user,
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