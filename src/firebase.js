// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWTB34t3DEm_5h1rROwE-tbtbFjz809iw',
  authDomain: 'lowtech-77567.firebaseapp.com',
  databaseURL: 'https://lowtech-77567-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'lowtech-77567',
  storageBucket: 'lowtech-77567.appspot.com',
  messagingSenderId: '239456788693',
  appId: '1:239456788693:web:9fd6831597451b5a7f425c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
