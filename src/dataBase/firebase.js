import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx1pSL4KnJrO9z8D8R-Bwzk0s-aK4tJpA",
  authDomain: "yourshape-97b78.firebaseapp.com",
  projectId: "yourshape-97b78",
  storageBucket: "yourshape-97b78.appspot.com",
  messagingSenderId: "26924161872",
  appId: "1:26924161872:web:05072cb60321f920716a55",
  storageBucket: "yourshape-97b78.appspot.com",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage(app);
export const db = getFirestore(app);
