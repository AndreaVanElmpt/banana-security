import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn(isAuth) {
    const {login} = useContext(AuthContext)
    function handleSubmit(e) {
        e.preventDefault();
        login();
    }
  return (
    <>
      <h1>{isAuth === true ? "Je bent ingelogd" : "Je bent niet ingelogd"} </h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
        <p>*invoervelden*</p>
        <button type='submit'>
            {isAuth === true ? "Uitloggen" : "Inloggen"}
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;