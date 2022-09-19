import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzmAEDVxu4VvkYm2SR_mNa6GEQhzGVR1k",
  authDomain: "your-shape-ccc8e.firebaseapp.com",
  projectId: "your-shape-ccc8e",
  storageBucket: "your-shape-ccc8e.appspot.com",
  messagingSenderId: "535869411845",
  appId: "1:535869411845:web:12df2c33b481929233426c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage(app);
export const db = getFirestore(app);
