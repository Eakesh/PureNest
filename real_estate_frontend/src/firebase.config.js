// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "purenest-1c771.firebaseapp.com",
  projectId: "purenest-1c771",
  storageBucket: "purenest-1c771.appspot.com",
  messagingSenderId: "322873566617",
  appId: "1:322873566617:web:853ac31b5fbde8aac89f08",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
