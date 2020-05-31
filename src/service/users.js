class UserService {
  constructor(userDAO) {
    this.userDAO = userDAO
  }

  async getUsers(userFilter) {
    return this.userDAO.getUsers(userFilter)
  }

  async getUser(userInput) {
    return this.userDAO.getUser(userInput)
  }

  async createUser(createUserInput) {
    return this.userDAO.createUser(createUserInput)
  }

  async updateUser(updateUserInput) {
    return this.userDAO.createUser(updateUserInput)
  }

  async deleteUser(deleteUserInput) {
    return this.userDAO.createUser(deleteUserInput)
  }
}

module.exports = UserService
