import env from "@/env";

import { initializeApp, getApps, getApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSendId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, app, provider };
