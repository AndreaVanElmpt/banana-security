import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const history = useHistory();


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token){
            const decodedToken = jwt_decode(token)

            getData(token, decodedToken.sub)


        } else {
            toggleAuth({
                ...auth,
                user: null,
                status: 'done'
            });
        }

        }, []);
    async function getData(token, id){
        // const decodedToken = jwt_decode(token);

        try {
            const data = await axios.get(`http://localhost:3000/600/users/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            toggleAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: data.data.username,
                    email: data.data.email,
                    id: data.data.id,
                },
                status: 'done',
            })
            history.push('/profile')
        }catch (e) {
            toggleAuth({
                ...auth,
                status: 'error',
            });
            localStorage.clear();
            console.error(e)
        }

    }
    function login (token){
        const decodedToken =jwt_decode( token );
        console.log(decodedToken)
        localStorage.setItem('token', token)

        getData(token, decodedToken.sub)


        console.log('De gebruiker is ingelogd')

    }


    function logout (){
        console.log('gebruiker is uitgelogd')
        toggleAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        history.push('/')
    }


    const data = {
       isAuth: auth.isAuth,
        user: auth.user,
       login: login,
       logout: logout,
    };

    return(

        <AuthContext.Provider value={data}>
            {auth.status === 'done' && children }
            {auth.status === 'pending' && <p>Loading...</p>}
            {auth.status === 'error' && <p>Error! Refresh de pagina</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;