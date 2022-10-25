import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { userHandle } from "utils";

const firebaseConfig = {
  apiKey: "AIzaSyAJWk1F4lxJW5LviSex_UOtTkGlbP-BZow",
  authDomain: "instagram-clone-f9b98.firebaseapp.com",
  projectId: "instagram-clone-f9b98",
  storageBucket: "instagram-clone-f9b98.appspot.com",
  messagingSenderId: "613131455854",
  appId: "1:613131455854:web:259b6b97af3f97b976057f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    userHandle(user || false);
  }
});

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.error(err.code);
  }
};
