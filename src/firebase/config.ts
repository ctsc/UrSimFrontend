import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBL2G3fOXtA4BXYmXiBPtGYRhgfWLIsg-w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ursim-8ce06.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ursim-8ce06",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ursim-8ce06.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "685097313149",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:685097313149:web:cc1df91c53410593796214",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BEGF4DPS0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional, only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;

