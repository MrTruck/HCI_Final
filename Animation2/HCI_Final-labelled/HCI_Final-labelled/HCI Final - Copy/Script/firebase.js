
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Initialize Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyCoul_8UdecvD6H0BWfERKpuljrWPUqkyw",
  authDomain: "friendly-farmer-dd16e.firebaseapp.com",
  projectId: "friendly-farmer-dd16e",
  storageBucket: "friendly-farmer-dd16e.firebasestorage.app",
  messagingSenderId: "235847694301",
  appId: "1:235847694301:web:b3ae7e83e499e38ab06834",
  measurementId: "G-LSEZJ5TP6H"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
