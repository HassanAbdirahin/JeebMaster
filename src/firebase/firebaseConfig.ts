import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt7U4jLZ5bkdamsy0pdu59xF-Cp12jWLA",
  authDomain: "jeebmaster-35699.firebaseapp.com",
  projectId: "jeebmaster-35699",
  storageBucket: "jeebmaster-35699.firebasestorage.app",
  messagingSenderId: "909298252234",
  appId: "1:909298252234:web:d0e6248266184f09b63733",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
