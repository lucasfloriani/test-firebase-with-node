import { RequestExtended, Response, NextFunction } from 'express'
import * as yup from 'yup'
import { ErrorHandler } from './error'
import { CreateUserInput, UserFilter, GetUserInput, UpdateUserInput, DeleteUserInput } from '../dto/user'

// TODO: Refactor yup types to stop using as <T> in validate
class UserValidationMiddleware {
  async getUsers(req: RequestExtended<UserFilter>, res: Response, next: NextFunction) {
    try {
      const schema = yup.object<UserFilter>().shape<UserFilter>({
        limit: yup.number().positive(),
      })
      req.payload = await schema.validate({
        ...(req.query.limit && { limit: req.query.limit }),
      }) as UserFilter
      return next()
    } catch (error) {
      console.error(error)
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async getUser(req: RequestExtended<GetUserInput>, res: Response, next: NextFunction) {
    try {
      const schema = yup.object<GetUserInput>().shape<GetUserInput>({
        id: yup.string().required(),
      })
      req.payload = await schema.validate({ id: req.params.id }) as GetUserInput
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async createUser(req: RequestExtended<CreateUserInput>, res: Response, next: NextFunction) {
    try {
      const schema = yup.object<CreateUserInput>().shape({
        name: yup.string().required(),
        address: yup.string().required(),
        password: yup.string().required(),
        email: yup.string().email().required(),
      })
      req.payload = await schema.validate(req.body) as CreateUserInput
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async updateUser(req: RequestExtended<UpdateUserInput>, res: Response, next: NextFunction) {
    try {
      const schema = yup.object<UpdateUserInput>().shape<UpdateUserInput>({
        id: yup.string().required(),
        name: yup.string().required(),
        address: yup.string().required(),
        password: yup.string().required(),
        email: yup.string().email().required(),
      })
      req.payload = await schema.validate({ id: req.params.id, ...req.body }) as UpdateUserInput
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }

  async deleteUser(req: RequestExtended<DeleteUserInput>, res: Response, next: NextFunction) {
    try {
      const schema = yup.object<DeleteUserInput>().shape<DeleteUserInput>({
        id: yup.string().required(),
      })
      req.payload = await schema.validate({ id: req.params.id }) as DeleteUserInput
      return next()
    } catch (error) {
      const err = new ErrorHandler(400, error.errors)
      return res.status(err.status).json(err)
    }
  }
}

export default UserValidationMiddleware
