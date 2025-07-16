import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBPYzCLcDLDH4wEaUgtr4xEf1PFHIU0kjo",
  authDomain: "react-quick-chat.firebaseapp.com",
  databaseURL: "https://react-quick-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-quick-chat",
  storageBucket: "react-quick-chat.firebasestorage.app",
  messagingSenderId: "372151713513",
  appId: "1:372151713513:web:0b7e71bb48386b9fdeba78",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase();
// export const storage = getStorage(app);
