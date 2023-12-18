import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmQtrtX8KaLQMXWVlvApLVsmymJJkUKCY",
  authDomain: "delivery-5a80e.firebaseapp.com",
  projectId: "delivery-5a80e",
  storageBucket: "delivery-5a80e.appspot.com",
  messagingSenderId: "119758199913",
  appId: "1:119758199913:web:7dbf5d65f57f1de3d1d6f8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
  