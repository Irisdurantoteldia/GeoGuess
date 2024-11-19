// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// La configuració de la teva aplicació Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgocb6Cuguf8fImno7u89Cmv64W1_To2A",
  authDomain: "geoguess-63a84.firebaseapp.com",
  projectId: "geoguess-63a84",
  storageBucket: "geoguess-63a84.firebasestorage.app",
  messagingSenderId: "145068406769",
  appId: "1:145068406769:web:912f2dfaed0f1907837650"
};

// Inicialitza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Obtenir la instància de Firestore

export default db; // Exportar la instància de Firestore
