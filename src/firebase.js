
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAc0i-3krdxM22HjtJGl2OpDdJ_fMLD54M",
  authDomain: "readify-app-b3ae1.firebaseapp.com",
  projectId: "readify-app-b3ae1",
  storageBucket: "readify-app-b3ae1.firebasestorage.app",
  messagingSenderId: "319428172355",
  appId: "1:319428172355:web:a3f79bf17258208bb8d2f6",
  measurementId: "G-R26XP9NMH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default app;