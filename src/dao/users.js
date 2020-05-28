class UserDAO {
  constructor(db) {
    this.db = db.collection('users')
  }

  getUsers = async () => {
    try {
      const snapshot = await this.db.get()
      const usersData = snapshot.docs.map(doc => doc.data())
      return usersData
    } catch (e) {
      console.error(e)
    }
  }

  getUser = async (userID) => {
    const snapshot = await this.db.doc(userID).get()
    const userData = snapshot.data()
    return userData
  }

  createUser = async (user) => {
    // TODO: codar o createUser
  }

  updateUser = async (user) => {
    // TODO: codar o updateUser
  }

  deleteUser = async (user) => {
    // TODO: codar o deleteUser
  }
}

module.exports = UserDAO
