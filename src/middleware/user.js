const yup = require('yup')
const { ErrorHandler } = require('./error')

class UserValidationMiddleware {
  async getUsers(req, res, next) {
    try {
      const schema = yup.object().shape({
        limit: yup.number().positive(),
      })
      req.payload = await schema.validate({
        ...(req.query.limit && { limit: req.query.limit }),
      })
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async getUser() {
    try {
      const schema = yup.object().shape({
        id: yup.string().required(),
      })
      req.payload = await schema.validate({ id: req.params.id })
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async createUser(req, res, next) {
    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        address: yup.string().required(),
        password: yup.string().required(),
        email: yup.string().email().required(),
      })
      req.payload = await schema.validate(req.body)
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async updateUser() {
    try {
      const schema = yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        address: yup.string().required(),
        password: yup.string().required(),
        email: yup.string().email().required(),
      })
      req.payload = await schema.validate({ id: req.params.id, ...req.body })
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async deleteUser() {
    try {
      const schema = yup.object().shape({
        id: yup.string().required(),
      })
      req.payload = await schema.validate({ id: req.params.id })
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }
}

module.exports = UserValidationMiddleware
