import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDANsb8v4IG6DZ1qUgk8gGkg7bG0hOnV68",
  authDomain: "nord-ecommerce.firebaseapp.com",
  projectId: "nord-ecommerce",
  storageBucket: "nord-ecommerce.appspot.com",
  messagingSenderId: "965514706033",
  appId: "1:965514706033:web:59013960a90fd057066fd0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const db = getFirestore(app);
export default app;
