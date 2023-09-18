// firebaseConfig.js
import { initializeApp } from "firebase/app";

import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";

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

const auth = getAuth(app);

export { app, auth, browserSessionPersistence };
