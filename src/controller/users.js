const usersValidation = require('../validation/users')

// CRUD = Create, Read, Update, Delete

const getUsers = (db) => {
  return async (req, res) => {
    try {
      const snapshot = await db.collection('users').get()
      const dados = snapshot.docs.map(doc => doc.data())
      res.status(200).json(dados)
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }
}

const getUser = (db) => {
  return async (req, res) => {
    try {
      const userID = req.params.id
      const snapshot = await db.collection('users').doc(userID).get()
      const userData = snapshot.data()
      res.status(200).json(userData)
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }
}

const createUser = (db) => {
  return async (req, res) => {
    try {
      await usersValidation.createUserValidation.validate(req.body, { abortEarly: true })
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }
}

const updateUser = (db) => {
  return async (req, res) => {
    try {
      await usersValidation.createUserValidation.validate(req.body, { abortEarly: true })
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }
}

const deleteUser = (db) => {
  return async (req, res) => {
    try {
      await usersValidation.createUserValidation.validate(req.body, { abortEarly: true })
    } catch (e) {
      res.status(400).json({ error: 'Não foi possível retornar o usuário' })
    }
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}