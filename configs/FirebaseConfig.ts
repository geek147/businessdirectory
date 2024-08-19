
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp4FozI8hpVDu9jf7RL6upuUvawXdp2qU",
  authDomain: "business-directory-2c7bd.firebaseapp.com",
  projectId: "business-directory-2c7bd",
  storageBucket: "business-directory-2c7bd.appspot.com",
  messagingSenderId: "439441429225",
  appId: "1:439441429225:web:28e5f84998b7fca2775678",
  measurementId: "G-HPYYJ0LJRB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);