import { collection,  addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjI1kbOTlcweGbipR9dq6JUpWuSznhYWU",
  authDomain: "cinihub-movie.firebaseapp.com",
  projectId: "cinihub-movie",
  storageBucket: "cinihub-movie.appspot.com",
  messagingSenderId: "783761560790",
  appId: "1:783761560790:web:be36240cc7d717e0c7e577"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(firebaseApp);

// Initialize Auth
const firebaseAuth = getAuth();

export const addMovieToList = async (userId, movieData) => {
  try {
    // Add movie data to Firestore collection
    const docRef = await addDoc(collection(firestore, `users/${userId}/myList`), movieData);
    console.log("Movie added to list successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding movie to list: ", error);
  }
};

export { firestore, firebaseAuth }; // Exporting firestore and firebaseAuth