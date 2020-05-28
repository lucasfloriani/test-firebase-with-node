const usersValidation = require('../validation/users')

class UserController {
  constructor(userDAO) {
    this.userDAO = userDAO
  }

  getUsers = async (req, res) => {
    try {
      const dados = await this.userDAO.getUsers()
      res.status(200).json(dados)
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar os usuários' })
    }
  }

  getUser = async (req, res) => {
    try {
      const userID = req.params.id
      const userData = await this.userDAO.getUser(userID)
      res.status(200).json(userData)
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }

  createUser = async (req, res) => {
    try {
      await usersValidation.createUserValidation.validate(req.body, { abortEarly: true })
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }

  updateUser = async (req, res) => {
    try {
      await usersValidation.createUserValidation.validate(req.body, { abortEarly: true })
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }

  deleteUser = async (req, res) => {
    try {
      await usersValidation.createUserValidation.validate(req.body, { abortEarly: true })
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }

}

module.exports = UserController