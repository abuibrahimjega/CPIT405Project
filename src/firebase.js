// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD65gehInLNEUxO-uCy7vyFkaZQ4u7J3Dc",
  authDomain: "studybuddy-a48ec.firebaseapp.com",
  projectId: "studybuddy-a48ec",
  storageBucket: "studybuddy-a48ec.appspot.com",
  messagingSenderId: "326721976209",
  appId: "1:326721976209:web:c8970059360a0c67794c30"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
