// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,onAuthStateChanged,
  createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmyQA-uSN2u5zAkkFwk85TdQdZ-v0yJDc",
  authDomain: "smartroute-c67cc.firebaseapp.com",
  projectId: "smartroute-c67cc",
  storageBucket: "smartroute-c67cc.firebasestorage.app",
  messagingSenderId: "546659010986",
  appId: "1:546659010986:web:fa07f9923277e669c5c3d3",
  measurementId: "G-8GQB1FF8DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

const loginForm = document.getElementById('loginForm');
const googleBtn = document.getElementById('googleSignIn');
const msg = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    // Sign in existing user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    msg.textContent = `Signed in: ${userCredential.user.email}`;
    // redirect to protected page, e.g. window.location = '/dashboard.html'
  } catch (err) {
    // If not found, optionally create account
    msg.textContent = `Error: ${err.message}`;
  }
});

googleBtn.addEventListener('click', function (){
   signInWithPopup(auth, googleProvider)
    .then ((result) => {    
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken;
    const user = result.user;
    // window.location.href = "loggedin.html";
    msg.textContent = `Signed in: ${result.user.displayName}`;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      msg.textContent = `Google sign-in error: ${errorMessage}`;
    });
    
  });