// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNBbCQ2OddXMFRm29LdRHJ72PtTMHseDo",
  authDomain: "mbb-e-commerce.firebaseapp.com",
  projectId: "mbb-e-commerce",
  storageBucket: "mbb-e-commerce.appspot.com",
  messagingSenderId: "974387749464",
  appId: "1:974387749464:web:1228068f2bf9547ea1602d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;