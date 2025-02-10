// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqcFPKmI4FcNmCCynerbY7CC9i7umvzuk",
  authDomain: "neocred-f1c9d.firebaseapp.com",
  projectId: "neocred-f1c9d",
  storageBucket: "neocred-f1c9d.appspot.com",
  messagingSenderId: "975587022454",
  appId: "1:975587022454:web:b13c9764082ecb93ae3157"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
