import firebase from 'firebase'

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

class FirebaseDatabase {
  getDatabaseConnection = (firebaseConfig: FirebaseConfig) => {
    try {
      firebase.initializeApp(firebaseConfig)
      return firebase.firestore()
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
}

export default FirebaseDatabase
