import React from "react";
// import firebase from '../firebase';
import './Auth.css';
import '../App.css';
import '../RemindersList';

// For Routing
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RemindersList from "../RemindersList";

const Home = () => {
  
   return (
      <Router>
         {/* <p>This is home.</p> */}
         <div>
            {/* <nav className="sub-navigation">
               <ul className="sub-navigation-links">
                  <li>
                     <Link
                        className="sub-navigation-links"
                        onClick={() => firebase.auth().signOut()}
                        // to="/contacts"
                        >Log out
                     </Link>
                  </li>
               </ul>
            </nav> */}
            
            <RemindersList />

         {/* SWITCHER */}
            <Switch>

            {/* <Route exact path="/bikediary">
               <BikeDiary />
            </Route>
            <Route path="/info">
               <Info />
            </Route>
            <Route path="/maintenance">
               <Maintenance />
            </Route>
            <Route path="/notes">
              
            </Route> */}
         </Switch>

         </div>
      </Router>
   );
};

export default Home;

