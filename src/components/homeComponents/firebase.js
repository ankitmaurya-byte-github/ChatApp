
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { getStorage, ref,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
import {  signInWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDTV9lII7rp6WhajicNMFhdNWhNJQytZ6c",
  authDomain: "berillium-d21db.firebaseapp.com",
  databaseURL: "https://berillium-d21db-default-rtdb.firebaseio.com",
  projectId: "berillium-d21db",
  storageBucket: "berillium-d21db.appspot.com",
  messagingSenderId: "245272328175",
  appId: "1:245272328175:web:5d420b3c28a49d1681a81a",
  measurementId: "G-WG2LRGQZ2Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export {getDownloadURL,
    createUserWithEmailAndPassword,signInWithEmailAndPassword,uploadBytesResumable,ref
,updateProfile}

