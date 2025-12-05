
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEiCuxBofOcDUcPBWakWiYSTA7M6Pbl5g",
  authDomain: "veya-ai-wellness-companion.firebaseapp.com",
  projectId: "veya-ai-wellness-companion",
  storageBucket: "veya-ai-wellness-companion.appspot.com",
  messagingSenderId: "940499937771",
  appId: "1:940499937771:web:b7de2c94b006f0eee211ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them for the app to use
export const auth = getAuth(app);
export const db = getFirestore(app);
