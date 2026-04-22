import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4HBnBYzsijq7LBocTtMUwA7iK0EeFH9Q",
  authDomain: "smart-ecommerce-afb55.firebaseapp.com",
  projectId: "smart-ecommerce-afb55",
  storageBucket: "smart-ecommerce-afb55.firebasestorage.app",
  messagingSenderId: "68878064334",
  appId: "1:68878064334:web:f15cc93b129110f39fce9f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
