import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
// import app from "./base.js";
import { AuthContext } from "./Auth.js";
import './Auth.css';
import '../App.css';
import firebase from '../firebase';
import { Button } from '@material-ui/core/';
import hero from '../Assets/Remind-hero.png';

const Login = ({ history }) => {
   const handleLogin = useCallback(
      async event => {
         event.preventDefault();
         const { email, password } = event.target.elements;
      try {
         await firebase
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
         history.push("/");   
      }  catch (error) {
         alert (error);
      }
   }, 
      [history]
   );

   const { currentUser } = useContext(AuthContext);

   if (currentUser) {
      return <Redirect to="/" />;
   }

   return (
      <div>
         <div className="header">
         <div className="hero-img">
            <img
               src={hero}
               // className="hero-img"
               alt="Hero"
            /> 
         </div>   
         
            <h1 className="heading-auth">Simple tasklist app</h1>
         </div>
         <p className="ingress-auth">This is easy tasklist application for you to keep on track your daily todo list's and other important topics.</p>
         <div className="form-container">
            <h2 className="subheading-auth">Log in</h2>
            <div className="form-auth">
               <form onSubmit={handleLogin}>
                  <input className="input" name="email" type="email" placeholder="Email" />
                  <input className="input" name="password" type="password" placeholder="Password" />
                  <Button type="submit" variant="contained" color="primary">Log in</Button>
               </form>
            </div>
         </div>   
      </div>
   );
};

export default withRouter(Login);