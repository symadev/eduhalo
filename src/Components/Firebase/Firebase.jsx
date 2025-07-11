// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTxEWEnSJgqgQ8W73sBfHnHeODJee88aU",
  authDomain: "eduhalo-auth.firebaseapp.com",
  projectId: "eduhalo-auth",
  storageBucket: "eduhalo-auth.firebasestorage.app",
  messagingSenderId: "317822708339",
  appId: "1:317822708339:web:b84839c4f0a2cc92d15806"
};

// Initialize Firebase
   export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);