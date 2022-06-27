import { firebase } from "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx1pSL4KnJrO9z8D8R-Bwzk0s-aK4tJpA",
  authDomain: "yourshape-97b78.firebaseapp.com",
  projectId: "yourshape-97b78",
  storageBucket: "yourshape-97b78.appspot.com",
  messagingSenderId: "26924161872",
  appId: "1:26924161872:web:05072cb60321f920716a55",
  measurementId: "G-EGGGHGE2BD",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
