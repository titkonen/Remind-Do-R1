import firebase from 'firebase';

const config = {
   apiKey: "AIzaSyDVYCy5hEofLd27KzGQTekBgsUpTqJgABM",
   authDomain: "remind-do.firebaseapp.com",
   databaseURL: "https://remind-do.firebaseio.com",
   projectId: "remind-do",
   storageBucket: "remind-do.appspot.com",
   messagingSenderId: "904960622966",
   appId: "1:904960622966:web:60291861f202536d5f3a57",
   measurementId: "G-KG54W0R8NE"
 };
 // Initialize Firebase
 firebase.initializeApp(config);

 export default firebase;
