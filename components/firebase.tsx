// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdRDMByJGKMWMJ3ltlQtRV3B7OtFD_irc",
  authDomain: "noriza-a3c9a.firebaseapp.com",
  projectId: "noriza-a3c9a",
  storageBucket: "noriza-a3c9a.firebasestorage.app",
  messagingSenderId: "22432036808",
  appId: "1:22432036808:web:f9a3b976e22c981cd932fd",
  measurementId: "G-QV7YGB3CCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, doc, updateDoc };
