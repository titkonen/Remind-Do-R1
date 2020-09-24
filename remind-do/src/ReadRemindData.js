import React from 'react';
import firebase from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core/';
import './ReadRemindData.css';

// MD Icons
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
     '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 240,
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

export const ReadRemindData = ({ muistutukset }) => {
   const classes = useStyles();
   const [remind, setRemind] = React.useState(muistutukset.remind);
   // const [newRemindText, setNewRemindText] = React.useState(muistutukset.remind);
   const [completed, setCompleted] = React.useState(muistutukset.completed);

   const onUpdate = () => {
      const db = firebase.firestore()
      db.collection('remind-do').doc(muistutukset.id).set({ ...muistutukset, remind })
   }

   const onDelete = () => {
      const db = firebase.firestore()
      db.collection('remind-do').doc(muistutukset.id).delete()
   }

   const markCompletedHandler = () => {
      const db = firebase.firestore()
      db.collection('remind-do').doc(muistutukset.id).set({ 
         ...muistutukset, 
         completed: "done." 
      })
      setCompleted("ok");
      console.log(completed);
   }

   return (
      <div className="#">

      <div className="remind-wrapper">
         <form className={classes.root} noValidate autoComplete="off">
            <TextField 
               id="standard-basic" 
               // label="Standard" 
               value={remind}
               onChange={(event) => setRemind(event.target.value)}
            />
        </form>
        <div className="action-buttons">
            <IconButton aria-label="edit" size="small" onClick={onUpdate}>
               <EditIcon />
            </IconButton>  
            <IconButton aria-label="delete" size="small" onClick={onDelete}>
               <DeleteIcon />
            </IconButton>
            <IconButton aria-label="done" size="small" onClick={markCompletedHandler}>
               <DoneIcon />
               <p value={completed} className="remind-completed" onChange={(event) => { setCompleted(event.target.value);}} >{completed}</p>
            </IconButton>
            
        </div>
      </div>  

      </div>
   )
}