import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSkfLqb9XLyJEA4BJJksZknT7PHjp84Vo",
  authDomain: "chat-app-26078.firebaseapp.com",
  projectId: "chat-app-26078",
  storageBucket: "chat-app-26078.appspot.com",
  messagingSenderId: "65628221927",
  appId: "1:65628221927:web:9c73782cb1451749df4d42",
  measurementId: "G-TBNMC654KM",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// Cấu hình firebase ở dưới local
auth.useEmulator('http://localhost:9099');
if(window.location.hostname == 'localhost') {
  db.useEmulator('localhost', '8080');
}


export { auth, db };
export default firebase;
