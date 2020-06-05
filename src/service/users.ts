import User from "../models/user"
import { UserFilter, GetUserInput, CreateUserInput, UpdateUserInput, DeleteUserInput } from "../dto/user"

interface userDAOI {
  getUsers: (payload: UserFilter) => Promise<User[]>
  getUser: (id: string) => Promise<User>
  createUser: (payload: User) => Promise<User>
  updateUser: (payload: User) => Promise<User>
  deleteUser: (payload: User) => Promise<User>
}

class UserService {
  private userDAO: userDAOI

  constructor(userDAO: userDAOI) {
    this.userDAO = userDAO
  }

  async getUsers(filter: UserFilter) {
    return this.userDAO.getUsers(filter)
  }

  async getUser(payload: GetUserInput) {
    return this.userDAO.getUser(payload.id)
  }

  async createUser(payload: CreateUserInput) {
    const user = new User(payload)
    return this.userDAO.createUser(user)
  }

  async updateUser(payload: UpdateUserInput) {
    const user = await this.userDAO.getUser(payload.id)
    user.updateFields(payload)
    return this.userDAO.updateUser(user)
  }

  async deleteUser(payload: DeleteUserInput) {
    const user = await this.userDAO.getUser(payload.id)
    return this.userDAO.deleteUser(user)
  }
}

export default UserService
