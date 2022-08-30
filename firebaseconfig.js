// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzxnDV0I7h6boou02d73NUpeDLrj6X5GI",
  authDomain: "chatapp-f62f8.firebaseapp.com",
  projectId: "chatapp-f62f8",
  storageBucket: "chatapp-f62f8.appspot.com",
  messagingSenderId: "569258002941",
  appId: "1:569258002941:web:e57703eeeca32593b1b194",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db =  getFirestore()
export { auth, db }