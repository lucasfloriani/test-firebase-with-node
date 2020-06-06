import express from 'express'
import 'express-group-routes'
import bodyParser from 'body-parser'
import { errorMiddleware } from '../middleware/error'
import UserController from '../controller/users'
import UserService from '../service/users'
import UserDAO from '../dao/users'

class RouterInitializer {
  initializeRoutes(db: firebase.firestore.Firestore) {
    // ===== Instancias do DAO =====
    const userDAO = new UserDAO(db)

    // ===== Instancias do DAO =====
    const userService = new UserService(userDAO)

    // ===== Instancias do Controller =====
    const userController = new UserController(userService)

    // ===== Configuração do express =====
    const router = express()

    // === Middleware ===
    router.use(bodyParser.urlencoded({ extended: false }))
    router.use(bodyParser.json())

    // === Routes ===
    router.group('/v1', (v1) => {
      userController.registerRoutes(v1)
    })

    router.use(errorMiddleware)
    return router
  }
}

export default RouterInitializer
