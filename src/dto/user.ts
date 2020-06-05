export interface UserFilter {
  limit?: number
}

export interface GetUserInput {
  id: string
}

export interface CreateUserInput {
  name: string
  address: string
  password: string
  email: string
}

export interface UpdateUserInput {
  id: string
  name: string
  address: string
  password: string
  email: string
}

export interface DeleteUserInput {
  id: string
}
