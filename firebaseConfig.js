import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3kxtBNq-3z7dodjJA-nG_KWjava73yqw",
  authDomain: "savemate-973b4.firebaseapp.com",
  projectId: "savemate-973b4",
  storageBucket: "savemate-973b4.appspot.com",
  messagingSenderId: "508761782631",
  appId: "1:508761782631:web:6aa04700ea4a42d45d17c2",
  measurementId: "G-XKCXLGXCXY",
};

const app = initializeApp(firebaseConfig);

// This check prevents re-initialization if auth is already initialized
let auth;
if (!app.auth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };
