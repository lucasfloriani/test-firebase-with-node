var firebase = require('firebase')

class FirebaseDatabase {
  getDatabaseConnection = (firebaseConfig) => {
    try {
      firebase.initializeApp(firebaseConfig)
      return firebase.firestore()
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
}

module.exports = FirebaseDatabase
