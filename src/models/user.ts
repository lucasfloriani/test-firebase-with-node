import { CreateUserInput, UpdateUserInput } from '../dto/user'

class User {
  // TODO: Correct way of setting id in user class
  // TODO: Change id property to be private
  // TODO: Check if need realy needs public in property
  public id!: string
  public name: string
  public address: string
  public password: string
  public email: string

  constructor(payload: CreateUserInput) {
    this.name = payload.name
    this.address = payload.address
    this.password = payload.password
    this.email = payload.email
  }

  updateFields(payload: UpdateUserInput) {
    this.name = payload.name
    this.address = payload.address
    this.password = payload.password
    this.email = payload.email
  }
}

export default User
