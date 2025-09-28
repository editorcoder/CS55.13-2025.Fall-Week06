/*
editorcoder
2025-09-27
SRJC CS55.13 Fall 2025
Week 6: Assignment 7: Database Basics  
firebase.js
*/

// Import Firebase functions
import { initializeApp } from "firebase/app"; // Import the initializeApp function to set up Firebase
import { getFirestore } from "firebase/firestore"; // Import getFirestore to access Firestore database

// Configure Firebase
// use environmental variables for security
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { // Create configuration object for Firebase initialization
  apiKey: process.env.FIREBASE_APIKEY, // Set API key from environment variable
  authDomain: process.env.FIREBASE_AUTHDOMAIN, // Set authentication domain from environment variable
  projectId: process.env.FIREBASE_PROJECTID, // Set project ID from environment variable
  storageBucket: process.env.FIREBASE_STORAGEBUCKET, // Set storage bucket from environment variable
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID, // Set messaging sender ID from environment variable
  appId: process.env.FIREBASE_APPID, // Set app ID from environment variable
  measurementId: process.env.FIREBASE_MEASUREMENTID, // Set measurement ID from environment variable
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase app with configuration
const db = getFirestore(app); // Get Firestore database instance from the initialized app
export { db }; // export object containing project DB
