import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
// import app from "./base.js";
import { AuthContext } from "./Auth.js";
import './Auth.css';
import '../App.css';
import firebase from '../firebase';



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
            <h1 className="heading">Log in to Remind-Do R1</h1>
         </div>
         {/* <h2 className="subheading-center">Bike data and maintenance application</h2>
         <p className="content-about">TrailHero is bicycle data gathering and maintenance application. You can mark down easily your bicycle related data and keep update your bicycle maintenance schedules and task lists.</p>
          */}
         <div className=" mb-48 text-center">
         {/* <h2 className="subheading-center">Log in</h2> */}
            <form onSubmit={handleLogin}>
               <input className="input" name="email" type="email" placeholder="Email" />
               {/* <label className="#">
                  Email
                  <input className="input" name="email" type="email" placeholder="Email" />
               </label> */}
               <input className="input" name="password" type="password" placeholder="Password" />
               {/* <label>
                  password
                  <input className="input" name="password" type="password" placeholder="Password" />
               </label> */}
               {/* <button type="submit">Log in</button> */}
               <button
                  type="submit"
                  variant="primary"
               >Log in
               </button>

            </form>
         </div>
         
      </div>
   );
};

export default withRouter(Login);