import React, {useContext, useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function SignIn() {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


   async function handleSubmit(e) {
        e.preventDefault()
        try {
          const response =await axios.post('http://localhost:3000/login', {
              email: email,
              password: password,
             });
            console.log( response.data.accessToken)
            login(response.data.accessToken);
        } catch(e) {
          console.error(e);
        }

    }
  return (
    <>
      <h1>Vul je login gegevens in </h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email
              <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
              />
          </label>
          <label htmlFor='password'>Password
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
              />
          </label>
        <button type='submit' onClick={handleSubmit}>
          inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;