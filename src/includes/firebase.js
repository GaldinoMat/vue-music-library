import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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
const storage = firebase.storage()

fbDatabase.enablePersistence().catch((error) => {
  console.error(`Firebase persistence error ${error.code}`)
})

const usersCollection = fbDatabase.collection('users')
const songsCollection = fbDatabase.collection('songs')
const commentsCollection = fbDatabase.collection('comments')

export { auth, fbDatabase, usersCollection, songsCollection, commentsCollection, storage }
