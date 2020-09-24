import React, { useCallback } from "react";
import { withRouter } from "react-router";
// import app from "./base.js";
import firebase from '../firebase';
import './Auth.css';
import '../App.css';

const SignUp = ({ history }) => {
   const handleSignUp = useCallback(async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
         await firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
         history.push("/");   
      }  catch (error) {
         alert (error);
      }
   }, [history]);

   return (
      <div>
         <div className="header">
            <h1 className="heading">Sign up</h1>
         </div>
         <h2 className="subheading-center">Bike data and maintenance application</h2>
         <p className="content-about">TrailHero is bicycle data gathering and maintenance application. You can mark down easily your bicycle related data and keep update your bicycle maintenance schedules and task lists.</p>
   
         {/* <h1>Sign up</h1> */}
         <div className=" mb-48 text-center">
            <form onSubmit={handleSignUp}>
               <input className="input" name="email" type="email" placeholder="Email" />
               {/* <label>
                  Email
                  <input className="input" name="email" type="email" placeholder="Email" />
               </label> */}
               <input className="input" name="password" type="password" placeholder="Password" />
               {/* <label>
                  password
                  <input className="input" name="password" type="password" placeholder="Password" />
               </label> */}
               <button
                  type="submit"
                  variant="primary"
               >Sign Up
               </button>
               {/* <button type="submit">Sign Up</button> */}
            </form>
            
         </div>
      </div>
   );
};

export default withRouter(SignUp);