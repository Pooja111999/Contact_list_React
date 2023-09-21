// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyCTNlD6DRid2ilB_TfDF5VZLi9CyFnAPmg",
  authDomain: "vite-contact-696c4.firebaseapp.com",
  projectId: "vite-contact-696c4",
  storageBucket: "vite-contact-696c4.appspot.com",
  messagingSenderId: "261231817620",
  appId: "1:261231817620:web:fec787a289b13f1cf95581"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);