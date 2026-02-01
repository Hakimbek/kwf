import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzf6gSXuzOFsNRLsQLOD1hMiHWjBZIjwI",
  authDomain: "kwf-mp-ba.firebaseapp.com",
  projectId: "kwf-mp-ba",
  storageBucket: "kwf-mp-ba.firebasestorage.app",
  messagingSenderId: "356669563122",
  appId: "1:356669563122:web:c6000db03b05e56ffd306b",
  measurementId: "G-TPWV9D7BRE",
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
