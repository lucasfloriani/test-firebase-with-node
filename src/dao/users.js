const { ErrorHandler } = require('../middleware/error')

class UserDAO {
  constructor(db) {
    this.db = db.collection('users')
  }

  async getUsers(filter) {
    const snapshot = await this.db.limit(filter.limit || 10).get()
    const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return usersData
  }

  async getUser(userInput) {
    const snapshot = await this.db.doc(userInput.id).get()
    if (!snapshot.exists) throw new ErrorHandler(401, 'Usuário não foi encontrado')
    const userData = snapshot.data()
    return userData
  }

  async createUser(user) {
    const { id } = await this.db.add(user)
    return { id, ...user }
  }

  async updateUser(user) {
    const { id, ...rest } = user
    await this.db.doc(id).update(rest)
    return user
  }

  async deleteUser(user) {
    await this.db.doc(user.id).delete()
    return user
  }
}

module.exports = UserDAO
