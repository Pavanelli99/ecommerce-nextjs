// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ1GYVgN6hz54_1W3qe-QNZK5zo2Sy_G8",
  authDomain: "ecommerce-nextjs-41ceb.firebaseapp.com",
  projectId: "ecommerce-nextjs-41ceb",
  storageBucket: "ecommerce-nextjs-41ceb.appspot.com",
  messagingSenderId: "1024034374496",
  appId: "1:1024034374496:web:0f6d0c289279cafb60d405",
  measurementId: "G-QC27L3WT3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);