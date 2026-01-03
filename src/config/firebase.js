import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey:  "AIzaSyCmyQA-uSN2u5zAkkFwk85TdQdZ-v0yJDc",
  authDomain: "smartroute-c67cc.firebaseapp.com",
  projectId:  "smartroute-c67cc",
  storageBucket: "smartroute-c67cc.firebasestorage.app",
  messagingSenderId: "546659010986",
  appId: "1:546659010986:web:fa07f9923277e669c5c3d3",
  measurementId: "G-8GQB1FF8DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;