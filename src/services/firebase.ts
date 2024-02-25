import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_uOrLu96ik3mUlAkXVtGeoBYnCNgJt6I",
    authDomain: "tepi-9b40d.firebaseapp.com",
    projectId: "tepi-9b40d",
    storageBucket: "tepi-9b40d.appspot.com",
    messagingSenderId: "880026858239",
    appId: "1:880026858239:web:5b20e4851b5ba0c6a112ca",
    measurementId: "G-MXG8YXE5M8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// 880026858239-mhdlv55f43h12047nhqivtgjr3475b8d.apps.googleusercontent.com