// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx1pSL4KnJrO9z8D8R-Bwzk0s-aK4tJpA",
  authDomain: "yourshape-97b78.firebaseapp.com",
  projectId: "yourshape-97b78",
  storageBucket: "yourshape-97b78.appspot.com",
  messagingSenderId: "26924161872",
  appId: "1:26924161872:web:05072cb60321f920716a55",
  measurementId: "G-EGGGHGE2BD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
