import React from 'react';
import firebase from './firebase';
import './App.css';
// import { ReadRemindData } from './ReadRemindData';
// import CssBaseline from '@material-ui/core/CssBaseline';

// For Auth imports
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./auth/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { AuthProvider } from './auth/Auth';
import PrivateRoute from "./auth/PrivateRoute";

// Views
import WelcomeView from './Views/WelcomeView';

// For MD
import clsx from 'clsx';
import { Container, AppBar, Toolbar, Typography, Drawer, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

// MD Icons
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 414,
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    //   width: 260,

    // },
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
  list: {
    width: 250,
  },
  fullList: {
    // width: 'auto',
    width: 200,
    // backgroundColor: 'red'
  },
}));

function App() {
  const classes = useStyles();
  // const [reminds, setReminds] = React.useState([]); 
  // const [newRemindText, setNewRemindText] = React.useState(); 
  const [state, setState] = React.useState({
    left: false
  });
  const [title, setTitle] = React.useState(); // For drawer navigation

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

   // Drawer Menu
   const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'left' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <ListItem button component={Link} to="/login" onClick={DrawerLink('Login')}>
          {/* <ListItemIcon><ExitToApp /></ListItemIcon> */}
          <ListItemText>Login</ListItemText>
        </ListItem>

        <ListItem button component={Link} to="/signup" onClick={DrawerLink('Sign Up')}>
          {/* <ListItemIcon><InboxIcon /></ListItemIcon> */}
          <ListItemText>Sign Up</ListItemText>
        </ListItem>

      <Divider />
        <ListItem button>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Log out" onClick={() => firebase.auth().signOut()} />
        </ListItem>
    </div>
  );

  const DrawerLink = title => () => {
    setTitle(title);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="#">
          <Container maxWidth="xl">
            <AppBar position="static">
              <Toolbar>
                <div>
                  {['left'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <IconButton 
                      onClick={toggleDrawer(anchor, true)}
                      className={clsx(classes.menuButton)}
                    ><MenuIcon 
                        className="menu-icon" 
                        key={anchor} 
                      />
                    </IconButton>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                  ))}
                </div>
                <Typography variant="h6" className={classes.title}>
                  Remind + Do.
                </Typography>
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