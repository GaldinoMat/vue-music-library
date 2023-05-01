import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/**
  Firebase configuration object
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initializes app with config object
firebase.initializeApp(firebaseConfig)

// Firebase variables
const auth = firebase.auth()
const fbDatabase = firebase.firestore()

const usersCollection = fbDatabase.collection('users')

export { auth, fbDatabase, usersCollection }
