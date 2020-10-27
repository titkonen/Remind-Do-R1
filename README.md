# Remind-Do-R1
Reminder app: Firebase, React and Material UI




// DESC ordering

// getting data
db.collection('cafes').get().then((snapshot) => {
   snapshot.docs.forEach(doc => {
      renderCafe(doc);
   })
});

.orderBy('name')