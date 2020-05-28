require('dotenv').config()
const FirebaseDatabase = require('./src/database/firebase')
const firebaseConfig = require('./src/database/firebaseConfig')
const UserController = require('./src/controller/users')
const UserDAO = require('./src/dao/users')
const bodyParser = require('body-parser')
const express = require('express')

const main = async () => {
  try {
    // === Conexão com o banco de dados (firebase) ===
    const firebaseDatabase = new FirebaseDatabase()
    const db = firebaseDatabase.getDatabaseConnection(firebaseConfig)

    // === Instancias do DAO ===
    const userDAO = new UserDAO(db)

    // === Instancias do Controller ===
    const userController = new UserController(userDAO)

    // === Configuração do express ===
    const app = express()

    // Middleware
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    // Routes
    app.get('/', userController.getUsers)
    app.get('/:id', userController.getUser)
    app.post('/:id', userController.createUser)
    app.put('/:id', userController.updateUser)
    app.delete('/:id', userController.deleteUser)

    // Init Server
    app.listen(3000, () => console.log('Example app listening on port 3000!'))
  } catch (e) {
    console.error(e)
  }
}

main()
