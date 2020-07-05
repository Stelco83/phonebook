import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD-MBdzb-nLw0Emxjfz6xgesmKn-2ljds0",
    authDomain: "phonebook-e11ec.firebaseapp.com",
    databaseURL: "https://phonebook-e11ec.firebaseio.com",
    projectId: "phonebook-e11ec",
    storageBucket: "phonebook-e11ec.appspot.com",
    messagingSenderId: "1012779537667",
    appId: "1:1012779537667:web:e34a7f0f4cc293f4044536",
    measurementId: "G-SJ56GKKWXJ"
  };
  // Initialize Firebase
 export default firebase.initializeApp(firebaseConfig);
  firebase.analytics()