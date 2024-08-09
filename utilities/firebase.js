//Add in any firebase config from the firebase website 
//after setting up a new project. Then try DisplayCollection



import { initializeApp } from "firebase/app";
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
