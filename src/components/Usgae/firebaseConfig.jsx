import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDbd7mCvD8Tr2gQWBc4Wbhjmd8m6LEdqDI",
  authDomain: "electronics-project-cb597.firebaseapp.com",
  databaseURL: "https://electronics-project-cb597-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ important
  projectId: "electronics-project-cb597",
  storageBucket: "electronics-project-cb597.appspot.com",
  messagingSenderId: "1022972751671",
  appId: "1:1022972751671:web:c94872b7cf84c7317ef4b2",
  measurementId: "G-M8RPZM7D40"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
