// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { geFirestore, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2UvAO0vXN6zPNUnO0AOiLGTmr3C693yI",
  authDomain: "inventory-management-ae165.firebaseapp.com",
  projectId: "inventory-management-ae165",
  storageBucket: "inventory-management-ae165.appspot.com",
  messagingSenderId: "653561726709",
  appId: "1:653561726709:web:2d63cf5ce53d1aef3767bc",
  measurementId: "G-1BXYGNXWSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export {firestore}