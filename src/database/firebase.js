var firebase = require('firebase')

class FirebaseDatabase {
  getDatabaseConnection = (firebaseConfig) => {
    try {
      firebase.initializeApp(firebaseConfig)
      return firebase.firestore()
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = FirebaseDatabase
