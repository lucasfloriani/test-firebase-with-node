import { RequestExtended, Response, NextFunction, Router } from 'express'
import UserValidationMiddleware from '../middleware/user'
import User from '../models/user'
import { CreateUserInput, UpdateUserInput, DeleteUserInput, GetUserInput, UserFilter } from '../dto/user'

interface userServiceI {
  getUsers: (payload: UserFilter) => Promise<User[]>
  getUser: (payload: GetUserInput) => Promise<User>
  createUser: (payload: CreateUserInput) => Promise<User>
  updateUser: (payload: UpdateUserInput) => Promise<User>
  deleteUser: (payload: DeleteUserInput) => Promise<User>
}

class UserController {
  private userService: userServiceI

  constructor(userService: userServiceI) {
    this.userService = userService
  }

  registerRoutes(router: Router) {
    const validation = new UserValidationMiddleware()
    router.group('/users', (userRoute: Router) => {
      userRoute.get('/', validation.getUsers, this.getUsers.bind(this))
      userRoute.get('/:id', validation.getUser, this.getUser.bind(this))
      userRoute.post('/', validation.createUser, this.createUser.bind(this))
      userRoute.put('/:id', validation.updateUser, this.updateUser.bind(this))
      userRoute.delete('/:id', validation.deleteUser, this.deleteUser.bind(this))
    })
  }

  async getUsers(req: RequestExtended<UserFilter>, res: Response, next: NextFunction) {
    try {
      const dados = await this.userService.getUsers(req.payload!)
      res.status(200).json(dados)
    } catch (err) {
      next(err)
    }
  }

  async getUser(req: RequestExtended<GetUserInput>, res: Response, next: NextFunction) {
    try {
      const userData = await this.userService.getUser(req.payload!)
      res.status(200).json(userData)
    } catch (err) {
      next(err)
    }
  }

  async createUser(req: RequestExtended<CreateUserInput>, res: Response, next: NextFunction) {
    try {
      const userData = await this.userService.createUser(req.payload!)
      res.status(201).json(userData)
    } catch (err) {
      next(err)
    }
  }

  async updateUser(req: RequestExtended<UpdateUserInput>, res: Response, next: NextFunction) {
    try {
      const userData = await this.userService.updateUser(req.payload!)
      res.status(200).json(userData)
    } catch (err) {
      next(err)
    }
  }

  async deleteUser(req: RequestExtended<DeleteUserInput>, res: Response, next: NextFunction) {
    try {
      const userData = await this.userService.deleteUser(req.payload!)
      res.status(200).json(userData)
    } catch (err) {
      next(err)
    }
  }
}

export default UserController
