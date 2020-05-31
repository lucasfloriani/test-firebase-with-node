const UserValidationMiddleware = require('../middleware/user')

class UserController {
  constructor(userService) {
    this.userService = userService
  }

  registerRoutes(router) {
    const validation = new UserValidationMiddleware()
    router.group('/users', (userRoute) => {
      userRoute.get('/', validation.getUsers, this.getUsers.bind(this))
      userRoute.get('/:id', validation.getUser, this.getUser.bind(this))
      userRoute.post('/', validation.createUser, this.createUser.bind(this))
      userRoute.put('/:id', validation.updateUser, this.updateUser.bind(this))
      userRoute.delete('/:id', validation.deleteUser, this.deleteUser.bind(this))
    })
  }

  async getUsers(req, res, next) {
    try {
      const dados = await this.userService.getUsers(req.payload)
      res.status(200).json(dados)
    } catch (err) {
      next(err)
    }
  }

  async getUser(req, res, next) {
    try {
      const userData = await this.userService.getUser(req.payload)
      res.status(200).json(userData)
    } catch (err) {
      next(err)
    }
  }

  async createUser(req, _, next) {
    try {
      const userData = await this.userService.createUser(req.payload)
      res.status(201).json(userData)
    } catch (err) {
      next(err)
    }
  }

  async updateUser(req, _, next) {
    try {
      const userData = await this.userService.updateUser(req.payload)
      res.status(200).json(userData)
    } catch (err) {
      next(err)
    }
  }

  async deleteUser(req, _, next) {
    try {
      const userData = await this.userService.deleteUser(req.payload)
      res.status(200).json(userData)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController