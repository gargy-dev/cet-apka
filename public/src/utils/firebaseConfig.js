import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9c349KQhRGwlhvk-adVnkbGRJccYLtBQ",
  authDomain: "cet-apka.firebaseapp.com",
  projectId: "cet-apka",
  storageBucket: "cet-apka.appspot.com",
  messagingSenderId: "764941331482",
  appId: "1:764941331482:web:91ba3e69acfe06bb05b5a3",
  measurementId: "G-YTX6M09HTX"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);