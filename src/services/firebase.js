import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfDNYqTfAu2w1SFZAXa7MtL7I45a8jdNI",
  authDomain: "devburger-app.firebaseapp.com",
  projectId: "devburger-app",
  storageBucket: "devburger-app.firebasestorage.app",
  messagingSenderId: "1014708865849",
  appId: "1:1014708865849:web:c7d1529446cccabab436e8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};