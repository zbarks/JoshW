import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyBuG4QCIuDDoDkV_az4ksM72TUcg2iVe2E",
  authDomain: "foot-forward-coaching.firebaseapp.com",
  projectId: "foot-forward-coaching",
  storageBucket: "foot-forward-coaching.firebasestorage.app",
  messagingSenderId: "774849329107",
  appId: "1:774849329107:web:a21c857d471e9f4cd8a126"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);