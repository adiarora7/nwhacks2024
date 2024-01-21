// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-x1Hyfz0uEAtvt9mwIBDNVHDKH_c1Edo",
  authDomain: "nwhacks2024-eb61b.firebaseapp.com",
  projectId: "nwhacks2024-eb61b",
  storageBucket: "nwhacks2024-eb61b.appspot.com",
  messagingSenderId: "1064573494117",
  appId: "1:1064573494117:web:74afaaeeb143bc7372b78c",
  measurementId: "G-RC660JRVC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };