import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const apiKey=process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain=process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const projectId=process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storageBucket=process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId=process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId=process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: `${authDomain}`,
  projectId: `${projectId}`,
  storageBucket: `${storageBucket}`,
  messagingSenderId: `${messagingSenderId}`,
  appId:`${appId}`
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const database = getFirestore(app)