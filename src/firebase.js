import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgGhbt82_px22WbJWgKJ9EIW10VOpoGos",
    authDomain: "drag-and-drop-5ce0c.firebaseapp.com",
    projectId: "drag-and-drop-5ce0c",
    storageBucket: "drag-and-drop-5ce0c.appspot.com",
    messagingSenderId: "480487895509",
    appId: "1:480487895509:web:ebbd666b43ec2a38d24d5c",
    measurementId: "G-14NSX31BFR"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, setDoc, doc, getDoc };
