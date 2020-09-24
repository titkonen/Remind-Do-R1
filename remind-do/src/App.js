import React from 'react';
import firebase from './firebase';
import './App.css';
import { ReadRemindData } from './ReadRemindData';
// import CssBaseline from '@material-ui/core/CssBaseline';
import {
  // BottomNavigation,
  // BottomNavigationAction,
  Container,
  AppBar,
  Toolbar,
  Fab,
  TextField,
  Typography
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

// For Auth imports
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./auth/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { AuthContext, AuthProvider } from './auth/Auth';
import PrivateRoute from "./auth/PrivateRoute";

// Views
import WelcomeView from './Views/WelcomeView';

// MD Icons
import AddIcon from '@material-ui/icons/Add';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 260,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [reminds, setReminds] = React.useState([]); 
  const [newRemindText, setNewRemindText] = React.useState(); 
  // const [value, setValue] = React.useState(); // MD BottomNavigation needs that?

  React.useEffect(() => {
    const db = firebase.firestore();
    return db.collection('remind-do').orderBy('remind').onSnapshot((snapshot) => {
      const remindData = [];
      snapshot.forEach(doc => remindData.push({...doc.data(), id: doc.id }));
      setReminds(remindData);
    });
}, []);

  const addReminder = () => {
    const db = firebase.firestore();
    db.collection('remind-do').add({
      remind: newRemindText,
      completed: ""
    });
    console.log(newRemindText);
  }

  return (
    <AuthProvider>
      <Router>
        <div className="#">
          
          <Container maxWidth="sm">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Remind + Do. R1
                </Typography>
                {/* <Button onClick={addReminder} color="#">Add reminder</Button> */}
                <ul className="navigation">
                <li>
                  <Link
                    className="navigation"
                    to="/login">Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="navigation"
                    to="/signup">Sign up
                  </Link>
                </li>
              </ul>
              </Toolbar>
            </AppBar>

             

              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/welcome">
                  <Welcome />
                </Route>
              </Switch>

              <div>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
              </div>

            <div className="add-reminder">
              <form className={classes.root} noValidate autoComplete="off">
                {/* <TextField id="standard-basic" label="Standard" />
                <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                <TextField 
                  id="outlined-basic" 
                  label="Add reminder" 
                  variant="outlined" 
                  value={newRemindText}
                  onChange={(event) => setNewRemindText(event.target.value)}
                />
              </form>
              <div className="float-button">
                <Fab color="primary" aria-label="add" size="small" onClick={addReminder}>
                  <AddIcon />
                </Fab>
              </div>
            </div>    


            {reminds.map(muistutukset => (
              <div className="grid-container" key={muistutukset.remind}>
                <div className="grid-item"><ReadRemindData muistutukset={muistutukset} /></div>
              </div>
          ))}

            {/* <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation> */}
          </Container>  
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

function Welcome() {
  return (
    <div>
      <div className="header">
      <h1 className="heading">Welcome</h1>
      </div>
      <div>
        <WelcomeView />
      </div>
    </div>
  );
}