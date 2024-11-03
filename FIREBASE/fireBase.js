import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, updateProfile, onAuthStateChanged, sendEmailVerification, deleteUser, EmailAuthProvider, reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1l4Rb-eMbxoDUsUW2W4v6hmskhZmkQ-U",
  authDomain: "example-1517c.firebaseapp.com",
  projectId: "example-1517c",
  storageBucket: "example-1517c.firebasestorage.app",
  messagingSenderId: "1038085418007",
  appId: "1:1038085418007:web:144b67a32da4e19e27c052",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword , signOut, updateProfile, onAuthStateChanged, sendEmailVerification, deleteUser, EmailAuthProvider, reauthenticateWithCredential};
