import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-28ehN-w8RTQHfua4sqivnNOg-9KLK3o",
  authDomain: "ripl-eab5f.firebaseapp.com",
  projectId: "ripl-eab5f",
  storageBucket: "ripl-eab5f.firebasestorage.app",
  messagingSenderId: "731079151622",
  appId: "1:731079151622:web:699b0e17765498b3807387",
  measurementId: "G-K8J1V09JKJ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;