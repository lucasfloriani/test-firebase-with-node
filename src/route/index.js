const express = require('express')
require('express-group-routes')
const bodyParser = require('body-parser')
const { errorMiddleware } = require('../middleware/error')
const UserController = require('../controller/users')
const UserService = require('../service/users')
const UserDAO = require('../dao/users')

class Router {
  initializeRoutes(db) {
    // === Instancias do DAO ===
    const userDAO = new UserDAO(db)

    // === Instancias do DAO ===
    const userService = new UserService(userDAO)

    // === Instancias do Controller ===
    const userController = new UserController(userService)

    // === Configuração do express ===
    const router = express()

    // Middleware
    router.use(bodyParser.urlencoded({ extended: false }))
    router.use(bodyParser.json())

    // Routes
    router.group('/v1', (v1) => {
      userController.registerRoutes(v1)
    })

    router.use(errorMiddleware)
    return router
  }
}

module.exports = Router
