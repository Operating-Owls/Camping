//Add in any firebase config from the firebase website 
//after setting up a new project. Then try the DisplayCollection file



import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
 //paste from firebase project
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
