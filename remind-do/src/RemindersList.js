import React from 'react';
import firebase from './firebase';
import './RemindersList.css';
import './App.css';
import { ReadRemindData } from './ReadRemindData';
import { Button, Container, Fab, TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

// MD Icons
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
      
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

function RemindersList() {
  const classes = useStyles();
  const [reminds, setReminds] = React.useState([]); 
  const [newRemindText, setNewRemindText] = React.useState(); 

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
    console.log('New reminder tallennettu')
  }

// Order by completed
const sortByCompleted = () => {
  const db = firebase.firestore();
  return db.collection('remind-do').orderBy('completed').onSnapshot((snapshot) => {
    const remindData = [];
    snapshot.forEach(doc => remindData.push({...doc.data(), id: doc.id }));
    setReminds(remindData);
  });
};

  // Sorting in DESC order testing
  const sortByDesc = () => {
    const db = firebase.firestore();
    return db.collection('remind-do').orderBy('remind',"desc").onSnapshot((snapshot) => {
      const remindData = [];
      snapshot.forEach(doc => remindData.push({...doc.data(), id: doc.id }));
      setReminds(remindData);
    });
 };

  // Sorting in ASC order testing
  const sortByAsc = () => {
    const db = firebase.firestore();
    return db.collection('remind-do').orderBy('remind',"asc").onSnapshot((snapshot) => {
      const remindData = [];
      snapshot.forEach(doc => remindData.push({...doc.data(), id: doc.id }));
      setReminds(remindData);
    });
 };

  return (

        <div className="#">
          <Container maxWidth="sm">

            <div className="add-reminder">
              <form className={classes.root} noValidate autoComplete="off">
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

            <div className="sorting-buttons">
              <Button color="primary" onClick={sortByCompleted}>Completed</Button><Button color="primary" onClick={sortByAsc}>ASC</Button><Button color="primary" onClick={sortByDesc}>DESC</Button>
            </div>

            {reminds.map(muistutukset => (
              <div className="grid-container" key={muistutukset.remind}>
                <div className="grid-item"><ReadRemindData muistutukset={muistutukset} /></div>
              </div>
            ))}

          </Container>  
        </div>
  );
}

export default RemindersList;
