//import { initializeApp } from 'firebase/app';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5WihehPoFODoyK2wB04fQMhgSL6nA9K8",
  authDomain: "campsite-booking-787a2.firebaseapp.com",
  projectId: "campsite-booking-787a2",
  storageBucket: "campsite-booking-787a2.appspot.com",
  messagingSenderId: "812683688079",
  appId: "1:812683688079:web:9157d9aa43ab80bc2ed8fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
