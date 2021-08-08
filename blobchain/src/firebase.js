// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAONKOmPL2LxtXkV7f_RDEBBAQz8bvtX0k",
    authDomain: "blobchain-d9dbe.firebaseapp.com",
    projectId: "blobchain-d9dbe",
    storageBucket: "blobchain-d9dbe.appspot.com",
    messagingSenderId: "92522396122",
    appId: "1:92522396122:web:91d5dec280e045be5d28e3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;