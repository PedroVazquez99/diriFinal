// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwrPVR6wbaUX3cOOC0ZAES9N0ARn9sWis",
  authDomain: "dirifinal.firebaseapp.com",
  projectId: "dirifinal",
  storageBucket: "dirifinal.firebasestorage.app",
  messagingSenderId: "854921224843",
  appId: "1:854921224843:web:da6429f165ce19d8132a8e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
