import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebaseConfig from "./firebaseConfig";

let analytics;
let auth;
let db;
let storage;

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

db = getFirestore();

auth = getAuth();

storage = getStorage();

export { auth, db, analytics, storage };
