import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"
import { getDatabase } from "firebase/database";
import { ref, get } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyDC-9t_7hpKVhgnjs6T_67CAALOk--su2A",
    authDomain: "tcharity-identity-service.firebaseapp.com",
    projectId: "tcharity-identity-service",
    storageBucket: "tcharity-identity-service.appspot.com",
    messagingSenderId: "24015932592",
    appId: "1:24015932592:web:23493123c8756dc29d7f75",
    measurementId: "G-6MT54QBMXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
export const realtimeDB = getDatabase(app)


