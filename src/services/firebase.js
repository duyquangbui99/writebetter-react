import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.FIREBASE_APP_ID
    apiKey: "AIzaSyDyC-M-hd7jsf23T9SVCzHGK9DZFnKFv3s",
    authDomain: "writebetter-36442.firebaseapp.com",
    projectId: "writebetter-36442",
    storageBucket: "writebetter-36442.firebasestorage.app",
    messagingSenderId: "979639131643",
    appId: "1:979639131643:web:352410c675b9d11ccb7f5e",
    measurementId: "G-FN9K490LV8"
};

console.log(process.env.FIREBASE_API_KEY,)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
